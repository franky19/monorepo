import axios from 'axios';

const hitLogger = async (message: string) => {
  try {
    const webhookUrl =
      'https://discord.com/api/webhooks/1177489603595354223/5FPc63ttKCRHxZN51kfDvdbkM9S39XIvyCpXkJTc9_gcKY8bFHCqmy8LoBG0PkhVUcr9';
    axios
      .post(webhookUrl, {
        content: message,
      })
      .catch(error => {
        throw `Error sending message: ${error.message}`;
      });
  } catch (error) {
    alert(error);
  }
};

export {hitLogger};
