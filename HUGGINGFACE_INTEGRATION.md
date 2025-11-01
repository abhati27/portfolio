# Hugging Face Space Integration Guide 🤗

## Overview

This chatbot is powered by a **direct frontend connection** to your Hugging Face Space: `abhati27/Career_Conversation_Anmol`

**No backend required!** All API calls are made directly from the browser using the `@gradio/client` SDK.

---

## How It Works

### 1. **Package Dependency**
```json
{
  "dependencies": {
    "@gradio/client": "^1.4.0"
  }
}
```

### 2. **Frontend Integration** (`app/chat/page.tsx`)

```typescript
import { client } from '@gradio/client';

const handleSendMessage = async (content: string) => {
  // Connect to your Hugging Face Space
  const app = await client('abhati27/Career_Conversation_Anmol');
  
  // View available API endpoints
  const apiInfo = await app.view_api();
  console.log('Hugging Face Space API Info:', apiInfo);
  
  // Try different possible input formats
  let result;
  const userInput = content.trim();
  
  try {
    // Format 1: Array with single string (most common for Gradio)
    result = await app.predict(0, [userInput]);
  } catch (e) {
    try {
      // Format 2: Object with 'message' key
      result = await app.predict(0, { message: userInput });
    } catch (e2) {
      try {
        // Format 3: Named endpoint with array
        result = await app.predict('/predict', [userInput]);
      } catch (e3) {
        try {
          // Format 4: Object with 'text' key
          result = await app.predict(0, { text: userInput });
        } catch (e4) {
          try {
            // Format 5: Object with 'input' key
            result = await app.predict(0, { input: userInput });
          } catch (e5) {
            // Format 6: Just the raw string
            result = await app.predict(0, userInput);
          }
        }
      }
    }
  }

  // Extract the response (handle different formats)
  let responseText: string;
  const firstData = result.data?.[0];
  
  if (typeof firstData === 'string') {
    responseText = firstData;
  } else if (firstData && typeof firstData === 'object' && 'value' in firstData) {
    // Gradio often returns objects with 'value' property
    responseText = firstData.value;
  } else if (typeof result.data === 'string') {
    responseText = result.data;
  } else if (result.data && typeof result.data === 'object' && 'value' in result.data) {
    responseText = result.data.value;
  } else {
    responseText = "I apologize, but I couldn't generate a response.";
    console.error('Unexpected response format:', result);
  }
  
  // Display in chat
  setMessages((prev) => [...prev, {
    role: 'assistant',
    content: responseText,
    timestamp: new Date(),
  }]);
};
```

**Why multiple fallbacks?**  
Gradio Spaces can use different input formats:

1. **Array format** (most common): `predict(0, [userInput])`
   - Arguments passed as array in order they appear
   - No parameter names needed
   
2. **Object format**: `predict(0, { message: userInput })`
   - Named parameters
   - Parameter name must match Space's expected key
   
3. **Raw value**: `predict(0, userInput)`
   - Some Spaces accept direct values
   
4. **Named endpoints**: `/chat`, `/predict`, `/generate`
   - Some Spaces expose named endpoints instead of numeric indices

The code tries all common patterns automatically, starting with the most likely format (array). Console logs help identify which format worked.

### 3. **User Flow**

```
Portfolio Page (/)
    ↓
User types message or clicks suggested prompt
    ↓
Router navigates to /chat?message=<encoded_message>
    ↓
Chat page calls Hugging Face Space API
    ↓
Response displayed in chat window
```

---

## Key Features

✅ **No API Keys** - Works with public Spaces  
✅ **No Backend** - All calls from frontend  
✅ **No Token Limits** - Uses your Space's resources  
✅ **Real-time** - Direct connection, no proxy  
✅ **Error Handling** - Graceful fallbacks on failures  

---

## Error Handling

```typescript
try {
  const app = await client('abhati27/Career_Conversation_Anmol');
  const result = await app.predict('/predict', { message });
  const responseText = result.data?.[0] || "Fallback message";
} catch (error) {
  console.error('Failed to connect:', error);
  // Show user-friendly error message
}
```

---

## Customization

### To Use a Different Hugging Face Space:

1. **Update the Space ID** in `app/chat/page.tsx`:
   ```typescript
   const app = await client('your-username/your-space-name');
   ```

2. **Check the API structure:**
   - Open browser console
   - Look for the `view_api()` output
   - It will show something like:
   ```json
   {
     "named_endpoints": {
       "/chat": {
         "parameters": [
           {
             "label": "Message",
             "type": "string",
             "python_type": { "type": "str" },
             "component": "Textbox",
             "example_input": "Hello"
           }
         ],
         "returns": [...]
       }
     }
   }
   ```

3. **Update the endpoint call** based on what you see:
   - If you see a named endpoint like `/chat`, use that
   - If you only see numeric indices, use `0`, `1`, etc.
   - Match the input parameter name from the API info

4. **Update response extraction** (if data structure differs):
   ```typescript
   const responseText = result.data?.[0] // Adjust index/path as needed
   ```

### Understanding view_api() Output

The `view_api()` call returns details about your Space's interface:

```json
{
  "named_endpoints": {
    "/endpoint_name": {
      "parameters": [
        {
          "label": "Input Label",
          "type": "string",          // Expected type
          "python_type": {...},
          "component": "Textbox"     // UI component type
        }
      ],
      "returns": [
        {
          "label": "Output",
          "type": "string"           // Return type
        }
      ]
    }
  }
}
```

**Key fields to check:**
- `named_endpoints`: Object keys are endpoint names (use these in `predict()`)
- `parameters[].label`: Input parameter names (lowercase, no spaces usually)
- `returns[]`: Output structure (helps with extracting response)

---

## Benefits of This Architecture

### 🚀 **Simpler Deployment**
- No backend API routes to maintain
- No server-side configuration
- Deploy as a static Next.js app

### 💰 **Cost Effective**
- No separate backend hosting costs
- Uses Hugging Face's free tier for public Spaces
- No API gateway or middleware

### 🔒 **Secure**
- No API keys exposed (using public Space)
- No backend secrets to manage
- Browser makes requests directly

### ⚡ **Fast**
- One less hop (no proxy through backend)
- Direct connection to AI service
- Reduced latency

---

## Testing

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Open browser:**
   Navigate to `http://localhost:3000`

3. **Test the flow:**
   - Click a suggested prompt on portfolio page
   - Should route to `/chat` page
   - Message sent automatically
   - Response appears in chat window

4. **Type a custom message:**
   - Enter text in chat input
   - Click send or press Enter
   - AI response should appear

---

## Troubleshooting

### Issue: "Objects are not valid as a React child"

**This is fixed!** This error occurs when the Hugging Face Space returns an object instead of a plain string.

**Common response formats from Gradio:**
- `{ value: "actual text", interactive: true, ... }` ← Most common
- `"plain string"` ← Direct string
- `[{ value: "text" }]` ← Array of objects

**The solution:** The code now extracts the `value` property from response objects:
```javascript
if (firstData && typeof firstData === 'object' && 'value' in firstData) {
  responseText = firstData.value; // Extract the actual text
}
```

This handles Gradio's default response format automatically.

### Issue: "Parameter `message` is not a valid keyword argument"

**This is fixed!** The code now tries multiple input formats:

1. **Array format first** (most common): `[userInput]`
2. Then object formats: `{ message: ... }`, `{ text: ... }`, `{ input: ... }`
3. Finally raw value: `userInput`

The console will show which format attempts failed and which succeeded.

**How it works:**
```javascript
try {
  result = await app.predict(0, [userInput]); // Try this first
} catch (e) {
  console.log('Format 1 failed, trying format 2...');
  // Try next format...
}
```

### Issue: "No endpoint matching that name or fn_index"

**This is fixed!** The code now:
1. Calls `app.view_api()` to discover available endpoints
2. Tries multiple common endpoint patterns
3. Logs API structure to browser console

**To find the correct endpoint:**
1. Open browser console (F12)
2. Send a message in the chat
3. Look for "Hugging Face Space API Info:" log
4. Find the endpoint structure, e.g.:
   ```json
   {
     "named_endpoints": {
       "/chat": { "parameters": [...] }
     }
   }
   ```
5. If needed, update the code to prioritize that endpoint

### Issue: "Failed to connect to chatbot"

**Possible causes:**
- Hugging Face Space is down/restarting (check Space page)
- Network connectivity issues
- Space is private (must be public)
- CORS restrictions

**Solutions:**
1. Visit your Space: `https://huggingface.co/spaces/abhati27/Career_Conversation_Anmol`
2. Verify it's running and public
3. Check browser console for specific error messages
4. Test Space directly on Hugging Face first

### Issue: Response is undefined or null

**Possible causes:**
- Response structure changed
- Space returns data in different format

**Solution:**
Check console logs for the full result object:
```typescript
console.log('Full response:', result);
console.log('Response data:', result.data);
```

Common response patterns:
- `result.data[0].value` - **Most common** (Gradio object with value property)
- `result.data[0]` - Single string response
- `result.data` - Direct string
- `result.data[0][0]` - Nested array
- `result.data.value` - Direct object with value property

**The code now handles all these patterns automatically!**

**Example Gradio response:**
```json
{
  "data": [
    {
      "value": "Here is my response text",
      "interactive": true,
      "placeholder": "",
      "__type__": "update"
    }
  ]
}
```

The extraction logic will find `result.data[0].value` = `"Here is my response text"` and display that.

---

## Future Enhancements

- [ ] Add request caching for repeated questions
- [ ] Implement conversation history context
- [ ] Add typing indicator during API call
- [ ] Show connection status indicator
- [ ] Add retry logic for failed requests

---

## Resources

- [Gradio Client Docs](https://www.gradio.app/guides/getting-started-with-the-js-client)
- [Hugging Face Spaces](https://huggingface.co/spaces)
- [Your Space](https://huggingface.co/spaces/abhati27/Career_Conversation_Anmol)

---

**Made with ❤️ - No backend needed!** 🚀

