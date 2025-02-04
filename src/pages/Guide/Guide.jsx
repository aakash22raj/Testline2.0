import React, { useState } from 'react'
import './Guide.css'
import { Link } from 'react-router-dom'

const Guide = () => {

    const [isChecked, setIsChecked] = useState(false);

  return (
    <div className='app'>
        <div className="guide-container">
          <h1 className="guide-title">Test Guidelines</h1>
    
          <div className="guide-content">
            <p>👉 The test contains questions with four answer choices.</p>
            <p>👉 Questions may have single or multiple correct answers.</p>
            <p>✅ Single Option Questions: Select one answer (represented by a <b>circular radio button</b>).</p>
            <p>✅ Multiple Option Questions: Select multiple answers (represented by <b>square checkboxes</b>).</p>
            <p>📌 Ensure you understand the question before selecting an answer.</p>
            <p>❌ Once you submit the test, then you cannot change your answers.</p>
            <p>⏳ The test have a fixed time, you finished the test before the given time.</p>
          </div>
    
          {/* Confirmation Checkbox */}
          <div className="confirmation">
            <input
              type="checkbox"
              id="confirm"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <label htmlFor="confirm">I have read and understood the guidelines.</label>
          </div>
    
          {/* Start Test Button */}
          <Link to='/test'>
            <button className={`start-button ${isChecked ? "active" : ""}`} disabled={!isChecked}>
              Start Test
            </button>
          </Link>
        </div>
    </div>
  )
}

export default Guide