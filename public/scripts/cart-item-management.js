const cartItemUpdateFormElements = document.querySelectorAll(
  ".cart-item-management"
);

async function updateCartItem(event) {
  event.preventDefault();

  const form = event.target;
  const productId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const quantity = form.firstElementChild.value;

  let response;

  try {
    response = await fetch("/cart/items", {
      method: "PATCH",
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("Something went wrong!");
    return;
  }

  if (!response.ok) {
    alert("Something went wrong!");
  }

  const responseData = response.json();

  
}

for (const cartItemUpdateFormElement of cartItemUpdateFormElements) {
  cartItemUpdateFormElement.addEventListener("submit", updateCartItem);
}
