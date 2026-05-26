import { useState } from "react";

interface FaqBoxProps {
    q: string;
    a: string;
}

const FaqBox = ({ q, a } : FaqBoxProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-box">
      <div className="faq-q" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className={`faq-arr${open ? " open" : ""}`}>▾</span>
      </div>
      <div className={`faq-a${open ? " open" : ""}`}><p>{a}</p></div>
    </div>
  );
}

export default FaqBox