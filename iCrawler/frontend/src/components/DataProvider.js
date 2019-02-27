import React, { Component } from "react";
import PropTypes from "prop-types";
class DataProvider extends Component {
  constructor(props) {
      super(props)
      this.state = {
          url: 'https://psicologiaymente.com/cultura/webs-cine-ver-peliculas-gratis',
          crawlingStatus: null,
          data: null,
          taskID: null,
          uniqueID: null
      }
      this.statusInterval = 1
      alert("chau");
  }

  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired
  };
  
  componentDidMount = () => {
    alert("estoy en handle");
    if (!this.state.url) return false;

    // send a post request to client when form button clicked
    // django response back with task_id and unique_id.
    // We have created them in views.py file, remember?
    $.post('/api/crawl/', { url: this.state.url }, resp => {
        if (resp.error) {
            alert(resp.error)
            return
        }
        // Update the state with new task and unique id
        this.setState({
            taskID: resp.task_id,
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
            { task_id: this.state.taskID, unique_id: this.state.uniqueID }, resp => {
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
    //const status = this.state.crawlingStatus;
    return <p>hola</p>;
  }


}
export default DataProvider;