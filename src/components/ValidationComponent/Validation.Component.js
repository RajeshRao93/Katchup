import React, { Component } from 'react';
import './Validation.Component.css';
import axios from 'axios';
var dateFormat = require("dateformat");

class Validation extends Component {
  geteventtovalidate = "http://1be9cd88.ngrok.io/getalleventsforadmin";
  validateurl = "http://1be9cd88.ngrok.io/updateventstatus";
  temp;
  subjects;
  constructor(props) {
    super(props);
    this.state = {
      userDetailsObject: {}
    };

    this.init = this.init.bind(this);
    this.postdata_approve = this.postdata_approve.bind(this);
    this.postdata_reject = this.postdata_reject.bind(this);
    this.onChange = this.onChange.bind(this);

    this.navigate = this.navigate.bind(this);
  }

  async postdata_approve(e) {
    e.preventDefault();
    var data = JSON.parse(localStorage.getItem('Eventdata'));

    await axios
      .post(
        this.validateurl,
        {
          eventid: data.event_id,
          status: "1"
        },
      ).then(resp => {
        console.log("Hello calling refresh");
        this.refresh();
      })
  }

  async refresh() {
    await axios
      .get(this.geteventtovalidate)
      .then(resp => {

        localStorage.removeItem('Eventdata');
        localStorage.clear();
        localStorage.setItem('Eventdata', JSON.stringify(resp.data));
        this.props.history.push("/eventRequests/");

      })
  }



  async postdata_reject(e) {
    e.preventDefault();
    var data = JSON.parse(localStorage.getItem('Eventdata'));

    await axios
      .post(
        this.validateurl,
        {
          eventid: data.event_id,
          status: "-1"
        },
      ).then(resp => {
        console.log(resp);
        //localStorage.setItem('LoginData', JSON.stringify(resp.data));
        //this.props.history.push("/Validation/");
        //  this.props.history.push("/signin/");

      })

    await axios
      .get(this.geteventtovalidate)
      .then(resp => {

        localStorage.removeItem('Eventdata');
        localStorage.clear();
        localStorage.setItem('Eventdata', JSON.stringify(resp.data));

        this.props.history.push("/eventRequests/");

      })
  }

  componentDidMount() {

    this.init();
  }

  navigate(buttonClicked) {
    if (buttonClicked === "statusCheck") {
      this.props.history.push("/checkStatus/");
      return;
    }
    else if (buttonClicked === "new") {
      this.props.history.push("/dashboard/");
    } else {
      this.props.history.push("/dashboard/");
    }

  }

  init() {

    var data = JSON.parse(localStorage.getItem('LoginData'));
    console.log(data);
    this.state.userDetailsObject = data;

  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    var data = JSON.parse(localStorage.getItem('Eventdata'));
    console.log(data);
    this.state.userDetailsObject = data;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">

                <form className="form-restaurantadd">
                  <div className="form-label-group">

                    <div>
                      <h3>Events for Validation</h3>
                    </div>
                    <div className="row">
                      <div className="col-6 my-2"> <b>Event ID :</b></div> <div className="col-6 my-2"> {this.state.userDetailsObject.event_id}</div>
                      <div className="col-6 my-2"> <b>Event Name :</b></div> <div className="col-6 my-2"> {this.state.userDetailsObject.event_name}</div>
                      <div className="col-6 my-2"> <b>Address : </b></div><div className="col-6 my-2">{this.state.userDetailsObject.address}</div>
                      <div className="col-6 my-2"> <b> Pincode :</b></div> <div className="col-6 my-2">{this.state.userDetailsObject.pincode}</div>
                      <div className="col-6 my-2"> <b>Event Type :</b></div><div className="col-6 my-2"> {this.state.userDetailsObject.event_type}</div>
                      <div className="col-6 my-2"> <b>Event Category :</b></div><div className="col-6 my-2">  {this.state.userDetailsObject.event_category}</div>
                      <div className="col-6 my-2"> <b>Date of Event :</b></div><div className="col-6 my-2">  {dateFormat(this.state.userDetailsObject.date_of_event, "isoDate")}</div>
                      <div className="col-6 my-2"> <b>Time of Event :</b></div><div className="col-6 my-2">  {this.state.userDetailsObject.time_of_the_event}</div>
                      <div className="col-6 my-2"> <b>Cost of Ticket :</b></div><div className="col-6 my-2">  {this.state.userDetailsObject.cost_of_ticket}</div>
                      <div className="col-6 my-2"> <b>Total Seats :</b></div><div className="col-6 my-2">  {this.state.userDetailsObject.total_seats}</div>
                      <div className="col-6 my-2"> <b>Premium Type :</b></div><div className="col-6 my-2">  {this.state.userDetailsObject.premium_type}</div>
                      <div className="col-6 my-2"> <b>Event Description :</b></div><div className="col-6 my-2"> {this.state.userDetailsObject.event_description}</div>
                    </div>
                    <div className="row btn-layout">
                      <div className="col-6">
                        <button
                          className="btn btn-lg btn-success btn-block text-uppercase"
                          type="submit"
                          onClick={this.postdata_approve}
                        >
                          Approve
        </button>
                      </div>
                      <div className="col-6">
                        <button
                          className="btn btn-lg btn-secondary btn-block text-uppercase"
                          type="submit"
                          onClick={this.postdata_reject}
                        >
                          Reject
        </button>
                      </div>
                    </div>


                  </div>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>


    );
  }
}

export default Validation;