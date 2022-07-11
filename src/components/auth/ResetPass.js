import React from 'react'

const ResetPass = () => {
  return (
    <div className="reset-pass">
      <div className="container pt-5">
        <div className="row row d-flex justify-content-center">
          <div className="col-md-6">
            <div className="card text-center">
              <div className="card-header p-4">
                <h5 className="mb-0">
                  <strong>Change password</strong>
                </h5>
              </div>
              <div className="card-body p-4">
                <p className="mb-4">Set a new password</p>
                <form action="" className="mb-4">
                  <div className="form-outline">
                    <input className="form-control mb-4" value=""/>
                      <label className="form-label">New password</label>
                      <div className="form-notch">
                        <div className="form-notch-leading"></div>
                        <div className="form-notch-middle" style={{width: '92px'}}></div>
                        <div className="form-notch-trailing"></div>
                      </div>
                    </div>
                    <div className="form-outline">
                      <input className="form-control mb-4" value=""/>
                        <label className="form-label">Confirm password</label>
                        <div className="form-notch">
                          <div className="form-notch-leading"></div>
                          <div className="form-notch-middle" style={{width: '112px'}}></div>
                          <div className="form-notch-trailing"></div>
                        </div>
                      </div>
                      <button
                        className="ripple ripple-surface ripple-surface-light btn btn-primary"
                        type="button"
                        role="button">Apply</button>
                    </form>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <u>
                        <a href="">Back to Log In</a>
                      </u>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

  )
}
export default ResetPass