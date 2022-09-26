import React from "react";

export default function useSwish() {
  var baseURL =
    typeof window !== "undefined" && "http://" + window.location.host + "/";
  var commerceType = "ecom";

  var identifier = "";
  var originalPaymentReference = "";
  var refundIdentifier = "";

  function clear() {
    identifier = "";
    originalPaymentReference = "";
    refundIdentifier = "";
  }

  function setCommerceType(type) {
    if (type != commerceType) {
      clear();
      commerceType = type;
    }
  }

  function updateStatus(status) {}
  function startPaymentClick(payer, amount, message) {
    postPayment(payer, amount, message);
  }

  function paymentStatusClick(commerceType) {}

  function startRefundClick(commerceType, AmountId, MessageId) {}

  function refundStatusClick(commerceType) {}

  function startQRPaymentClick() {}

  // ------------------------------------------

  function postPayment(payer, amount, message) {
    const url = baseURL + "paymentrequests";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payerAlias: payer,
        amount: amount,
        message: message,
      }),
    })
      .then(function (response) {
        if (response.status != 201) {
          updateStatus("Request failure: " + response.statusText);
          return;
        }
        console.log(response, "js1");
        return response.json();
      })
      .then(function (json) {
        if (json) {
          identifier = json["id"];
          updateStatus(
            "Payment request created with identifier " +
              identifier +
              ", open app."
          );
          console.log(json, "js");
        }
      })
      .catch(function (error) {
        console.log("Request failure: ", error);
      });
  }

  function postQRPayment(amount, message) {
    const url = baseURL + "paymentrequests";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
        message: message,
      }),
    })
      .then(function (response) {
        if (response.status != 201) {
          updateStatus("Request failure: " + response.statusText);
          return;
        }
        return response.json();
      })
      .then(function (json) {
        if (json) {
          identifier = json["id"];
          const token = json["token"];
          const url = baseURL + "qr/" + token;
          fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(function (response) {
              return response.blob();
            })
            .then(function (blob) {
              var objectURL = URL.createObjectURL(blob);
              document.getElementById("QR").src = objectURL;
              return response;
            })
            .catch(function (error) {
              console.log("Request failure: ", error);
            });
        }
      })
      .catch(function (error) {
        console.log("Request failure: ", error);
      });
  }

  function getPaymentStatus(id) {
    const url = baseURL + "paymentrequests/" + id;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (json.status == "PAID") {
          originalPaymentReference = json["paymentReference"];
        }
        updateStatus(
          "Payment(identifier: " +
            identifier +
            ", paymentReference: " +
            originalPaymentReference +
            ") " +
            json.status
        );
      })
      .catch(function (error) {
        console.log("Request failure: ", error);
      });
  }

  function postRefund(payRef, amount, message) {
    const url = baseURL + "refunds";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        originalPaymentReference: payRef,
        amount: amount,
        message: message,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        refundIdentifier = json["id"];
        originalPaymentReference = json["originalPaymentReference"];
        updateStatus(
          "Refund started for paymentReference " + originalPaymentReference
        );
      })
      .catch(function (error) {
        updateStatus("Refund error");
        console.log("Request failure: ", error);
      });
  }

  function getRefundStatus(id) {
    const url = baseURL + "refunds/" + id;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        updateStatus(
          "Refund " +
            json.status +
            " for payment with reference: " +
            json.originalPaymentReference
        );
      })
      .catch(function (error) {
        updateStatus("Get Refund Error");
        console.log("Request failure: ", error);
      });
  }

  return {
    setCommerceType,
    updateStatus,
    startPaymentClick,
    paymentStatusClick,
    startRefundClick,
    refundStatusClick,
    startQRPaymentClick,
    postPayment,
    postQRPayment,
    getPaymentStatus,
    postRefund,
    getRefundStatus,
  };
}
