export const createDivElement = (attributes) => {
  const divElement = document.createElement('div');

  if (attributes)
    Object.entries(attributes).forEach(([attributeKey, attributeValue]) => {
      divElement.setAttribute(attributeKey, attributeValue);
    });

  return divElement;
};

export const appendContainer = (element) => {
  const container = document.getElementById('container');
  container.appendChild(element);
};
