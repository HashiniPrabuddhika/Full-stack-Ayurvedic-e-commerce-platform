import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <span className="pk-eyebrow">Get in Touch</span>
          <h1 className="pk-section-title">We'd Love to Hear From You</h1>
          <p className="pk-section-sub">
            Questions about a herb, a bulk order, or your delivery? Our team in Sri Lanka is here to help.
          </p>
        </div>

        <div className="row justify-content-center g-4">
          <div className="col-md-4">
            <div className="pk-contact-info-card text-center h-100">
              <i className="bi bi-geo-alt-fill"></i>
              <h6 className="mt-3 mb-1">Visit Us</h6>
              <p className="small text-muted mb-0">Galle Road, Ambalangoda, Sri Lanka</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="pk-contact-info-card text-center h-100">
              <i className="bi bi-telephone-fill"></i>
              <h6 className="mt-3 mb-1">Call Us</h6>
              <p className="small text-muted mb-0">+94 77 123 4567</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="pk-contact-info-card text-center h-100">
              <i className="bi bi-whatsapp"></i>
              <h6 className="mt-3 mb-1">WhatsApp</h6>
              <p className="small text-muted mb-0">+94 77 123 4567</p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-5">
          <div className="col-lg-8">
            <div className="contact-form p-5">
              <h2 className="text-center mb-4 pk-section-title">Send a Message</h2>
              <form
                action="https://formsubmit.co/induwaramihisara@gmail.com"
                method="POST"
              >
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="firstName"
                      className="form-control custom-input"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="lastName"
                      className="form-control custom-input"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="email"
                      name="email"
                      className="form-control custom-input"
                      placeholder="Email Address"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      name="message"
                      className="form-control custom-input"
                      rows="5"
                      placeholder="Your Message"
                      required
                    ></textarea>
                  </div>

                  {/* Hidden options for better behavior */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_subject" value="New message from Prakruti Ayurveda contact form!" />
                  <input type="hidden" name="_template" value="table" />

                  <div className="col-12">
                    <button className="btn btn-gold w-100 py-3" type="submit">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;