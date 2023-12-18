import React, { useState, useEffect } from "react";
function AcceptCookiesModal() {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    const cookiesAccepted = cookies.some((cookie) =>
      cookie.trim().startsWith("cookiesAccepted=")
    );
    if (cookiesAccepted) {
      setShowModal(false);
    }
  }, []);

  const acceptCookies = () => {
    document.cookie =
      "cookiesAccepted=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    setShowModal(false);
  };

  const rejectCookies = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 max-w-xs mx-auto text-center">
            <p className="mb-2">
              We use cookies to enhance your browsing experience. By continuing
              to use our website, you agree to our{" "}
              <a href="/privacy-policy" className="text-blue-500">
                privacy policy
              </a>
              .
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 mr-2"
              onClick={acceptCookies}
            >
              Accept
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600"
              onClick={rejectCookies}
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AcceptCookiesModal;
