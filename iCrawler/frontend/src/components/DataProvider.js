import React, { Component } from "react";
import PropTypes from "prop-types";


class DataProvider extends Component {
  constructor(props) {
      super(props)
      this.state = {
          url: 'http://www.rentalugar.com/alquileres-en-la-costa/mar-del-plata',
          crawlingStatus: null,
          data: null,
          taskID: null,
          uniqueID: null,
      }
      this.statusInterval = 1
  }

  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
    render2: PropTypes.func.isRequired,
    urlParairnosDP: PropTypes.string.isRequired,
    urlRentalDP: PropTypes.string.isRequired
  };
  
  componentDidMount = () => {
    if (!this.state.url) return false;

    // send a post request to client when form button clicked
    // django response back with task_id and unique_id.
    // We have created them in views.py file, remember?
    $.post('/api/crawl/', { url: this.props.urlParaIrnosDP , url2: this.props.urlRentalDP }, resp => {
        if (resp.error) {
            alert(resp.error)
            return
        }
        // Update the state with new task and unique id
        this.setState({
            taskID1: resp.task_id1,
            taskID2: resp.task_id2,
            uniqueID: resp.unique_id,
            crawlingStatus: resp.status
        }, () => {
            // ####################### HERE ########################
            // After updating state, 
            // i start to execute checkCrawlStatus method for every 2 seconds
            // Check method's body for more details
            // ####################### HERE ########################
            this.statusInterval = setInterval(this.checkCrawlStatus, 2000)
        });
    });
  }

  componentWillUnmount() {
      // i create this.statusInterval inside constructor method
      // So clear it anyway on page reloads or 
      clearInterval(this.statusInterval)
  }

  checkCrawlStatus = () => {
      // this method do only one thing.
      // Making a request to server to ask status of crawling job
      $.get('/api/crawl/',
            { task_id1: this.state.taskID1,task_id2: this.state.taskID2, unique_id: this.state.uniqueID }, resp => {
          if (resp.data) {
              // If response contains a data array
              // That means crawling completed and we have results here
              // No need to make more requests.
              // Just clear interval
              clearInterval(this.statusInterval)
              this.setState({
                  data: resp.data
              })
          } else if (resp.error) {
              // If there is an error
              // also no need to keep requesting
              // just show it to user
              // and clear interval
              clearInterval(this.statusInterval)
              alert(resp.error)
          } else if (resp.status) {
              // but response contains a `status` key and no data or error
              // that means crawling process is still active and running (or pending)
              // don't clear the interval.
              this.setState({
                  crawlingStatus: resp.status
              });
          }
      })
  }

  render() {
    const status = this.state.crawlingStatus;
    const data= JSON.parse(this.state.data);
    const data2= "algo";
    if (data)
    {
      return this.props.render(data);
    }
    else
      return this.props.render2(data2);
  }

}
export default DataProvider;