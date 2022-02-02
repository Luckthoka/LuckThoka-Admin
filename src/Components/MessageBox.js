import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useSnackbar } from "notistack";

function MessageBox({ children, isError }) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (children) {
      if (!isError) {
        enqueueSnackbar(children, { variant: "success" });
      } else {
        enqueueSnackbar(children, { variant: "error" });
      }
    }
  }, [children]);

  return (
    <div className="mt-2">
      {!isError && <Alert variant="success">{children}</Alert>}
      {isError && <Alert variant="danger">{children}</Alert>}
    </div>
  );
}

export default MessageBox;
