"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const productSelect = document.getElementById("product");
    const quantityInput = document.getElementById("quantity");
    const calculateButton = document.getElementById("calculate");
    const resultDiv = document.getElementById("result");
    const errorDiv = document.getElementById("quantity-error");
    const orderForm = document.getElementById("order-form");

    const numberRegex = /^[1-9]\d*$/;

    function validateInput() {
        const quantityValue = quantityInput.value.trim();
        const isValid = numberRegex.test(quantityValue);

        if (!isValid) {
            errorDiv.style.display = "block";
            return false;
        }
        errorDiv.style.display = "none";
        return true;
    }

    function calculateOrderCost() {
        if (!validateInput()) {
            resultDiv.innerHTML = "<div style=\"color: #e74c3c;\">Пожалуйста, исправьте ошибки в форме</div>";
            return;
        }

        const productPrice = parseInt(productSelect.value, 10);
        const quantity = parseInt(quantityInput.value, 10);
        const totalCost = productPrice * quantity;
        const formattedCost = totalCost.toLocaleString("ru-RU");
        const formattedPrice = productPrice.toLocaleString("ru-RU");
        const productText = productSelect.options[productSelect.selectedIndex].text;
        const productName = productText.split(" - ")[0];

        resultDiv.innerHTML = "<div>Стоимость заказа:</div>" +
            "<div class=\"total-cost\">" + formattedCost + " ₽</div>" +
            "<div class=\"product-details\">" + productName + " × " + quantity + " шт. (" + formattedPrice + " ₽ за шт.)</div>";
    }

    function resetCalculator() {
        quantityInput.value = "";
        errorDiv.style.display = "none";
        resultDiv.innerHTML = "<div>Стоимость заказа </div>";
    }

    calculateButton.addEventListener("click", calculateOrderCost);
    quantityInput.addEventListener("input", validateInput);
    quantityInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            calculateOrderCost();
        }
    } );

    productSelect.addEventListener("change", function () {
        if (quantityInput.value.trim() !== "" && validateInput()) {
            calculateOrderCost();
        }
    } );

    quantityInput.addEventListener("blur", function () {
        if (quantityInput.value.trim() === "") {
            resetCalculator();
        }
    } );

    orderForm.addEventListener("submit", function (event) {
        event.preventDefault();
        calculateOrderCost();
    } );
}  );