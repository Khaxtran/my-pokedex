import React, { useRef, useState } from 'react'

export default function Pokemon({ active, onHide }) {
    
  return (
    <div className={`modal ${active}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title"> <strong>Your Enquiry</strong></p>
          <button
            className="delete"
            aria-label="close"
            onClick={onHide}
          ></button>
        </header>

        <section className="modal-card-body has-text-left">
          <div className="field">
            <label className="label">May I know your name?</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="text"
                
                placeholder=""
              />
              <span className="icon is-small is-left">
                
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">Your email</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="email"
                
                placeholder="hello@email.com"
              />
              <span className="icon is-small is-left">
                
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">Message</label>
            <div className="control has-icons-left has-icons-right">
              <div className="control">
                <textarea
                  className="textarea"
                  
                  placeholder="Please describe your question here..."
                ></textarea>

                <span className="icon is-small is-right">
                  
                </span>
              </div>
            </div>
          </div>
        </section>

        <footer className="modal-card-foot is-flex is-flex-wrap-wrap is-justify-content-space-between is-align-items-center">
          <div className="control">
            
          </div>

          <button className="button is-white" onClick={onHide}>
            Nevermind
          </button>
        </footer>
      </div>
    </div>
  )
}
