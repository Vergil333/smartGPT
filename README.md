# smartGPT

This APP works entirely in front-end.

All API calls to openai API are made from browsers, and it is not recommended but for testing purposes we can ignore the risk.

The logic here is based on 3 roles:
- QA, question is given and 3 responses are generated
- Reflexion, original question with all 3 responses is passed to another gpt instance to validate the responses
- Resolver, question, answers and critique is passed to another gpt instance to compose final answer

This is based on YouTube video from [AI Explained](https://www.youtube.com/@ai-explained-).
Watch it for explanation [here](https://www.youtube.com/watch?v=wVzuvf9D9BU).