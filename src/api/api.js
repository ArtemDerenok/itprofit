const sendForm = async (payload) => {
  const response = await fetch('http://localhost:9090/api/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return data;
};

export default sendForm;
