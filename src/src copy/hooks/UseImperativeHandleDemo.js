// Modal.jsx
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

// The forwardRef is crucial for receiving the ref from the parent.
const Modal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  // 1. This is where the magic happens!
  useImperativeHandle(ref, () => ({
    // 2. We expose ONLY the methods the parent needs.
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));

  if (!isOpen) return null;

  return (
    <div
      style={{
        border: "2px solid black",
        padding: "20px",
        backgroundColor: "white",
        position: "relative",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
      }}
    >
      <h4>Modal Content!</h4>
      <p>This modal's state is managed internally.</p>
      <button onClick={() => setIsOpen(false)}>Close from within</button>
    </div>
  );
});

// ParentComponent.jsx (The consumer)
const UseImperativeHandleDemo = () => {
  // 3. The parent holds the ref.
  const modalRef = useRef(null);

  return (
    <div>
      <h3>useImperativeHandle Modal Example</h3>

      {/* 4. The parent passes the ref to the Modal */}
      <Modal ref={modalRef} />

      {/* 5. The parent can now call the exposed methods */}
      <button onClick={() => modalRef.current.open()}>Open Modal</button>
      <button onClick={() => modalRef.current.close()}>Close Modal</button>

      <p style={{ marginTop: "20px" }}>
        The parent component only knows about `open()` and `close()`, not the
        internal `isOpen` state.
      </p>
    </div>
  );
};

export default UseImperativeHandleDemo;
