import fetch from "node-fetch";

async function send(webhook, message) {
  const body = JSON.stringify({
    content: message,
  });

  // console.log(body);
  const response = await fetch(webhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  // console.log(response);
  if (response.status !== 204) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response;
}

export { send };
