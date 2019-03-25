import React, { Component } from "react";
import PropTypes from "prop-types";


class DataProvider extends Component {
  constructor(props) {
      super(props)
      this.state = {
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
  
    
    $.post('/api/crawl/', { url: this.props.urlParairnosDP , url2: this.props.urlRentalDP }, resp => {
        if (resp.error) {
            alert(resp.error)
            return
        }
        
        this.setState({
            taskID1: resp.task_id1,
            taskID2: resp.task_id2,
            uniqueID: resp.unique_id,
            crawlingStatus: resp.status
        }, () => {
            
            this.statusInterval = setInterval(this.checkCrawlStatus, 2000)
        });
    });
  }

  componentWillUnmount() {
      clearInterval(this.statusInterval)
  }

  checkCrawlStatus = () => {
      
      $.get('/api/crawl/',
            { task_id1: this.state.taskID1,task_id2: this.state.taskID2, unique_id: this.state.uniqueID }, resp => {
          if (resp.data) {
              
              clearInterval(this.statusInterval)
              this.setState({
                  data: resp.data
              })
          } else if (resp.error) {
              
              clearInterval(this.statusInterval)
              alert(resp.error)
          } else if (resp.status) {
              
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