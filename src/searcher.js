import React from "react";
import PropTypes from "prop-types";
import {GridList,GridListTile,GridListTileBar,IconButton,TextField,InputLabel,Select,FormControl,withStyles,CircularProgress} from '@material-ui/core';
import { fetchToDos } from './Action/dataAction'
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import _ from "lodash";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  root1: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  loaderroot: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
      display: "flex",
      alignItems: 'center',
      justifyContent: 'center'
    },
  },
  gridList: {
    width: "100%",
    height: "100%",
  }
});

class Searcher extends React.Component{
  state = {
    selected: null,
    listOfData:[],
    searchPitem:''
  };

    callApis = (event) =>{
      this.setState({searchPitem: event.target.value});
      event.persist();
      if(this.state.selected != null){
      if (!this.debouncedFn) {
        this.debouncedFn =  _.debounce(() => {
        let searchStr = event.target.value;
      this.getOfflineOrOnlineData(searchStr);
        }, 700);
      }
      this.debouncedFn();
    }else{
          alert("Select Entity Type");
        }
      
    }

   getOfflineOrOnlineData = (value) => {
    if(value.length >= 3){
      if(this.props.todos.datas.items != null || this.props.todos.datas.items != undefined){
      if(this.props.todos.datas.items.length>0 && this.props.todos.UIdata.length>0){
        
        var offlineData = [];
        if(this.state.selected == "repositories"){
          offlineData = this.props.todos.datas.items.filter((item)=>{
            return item.owner.login.startsWith(value);
        })
        }else{
          offlineData = this.props.todos.datas.items.filter((item)=>{
            return item.login.startsWith(value);
        })
        }
        
       if(offlineData.length != 0){
        this.props.todos.UIdata = offlineData; 
       }
        else{
          this.props.fetchToDos(this.state.selected,value)
        }
      }else{
        this.props.fetchToDos(this.state.selected,value)
      }
    }else{
      this.props.fetchToDos(this.state.selected,value)
    }
    }
  }

  handleChange = (value) => {
    this.setState({selected:value})
    this.props.todos.UIdata = [];
    if(this.state.searchPitem.length >= 3){
      this.props.fetchToDos(value,this.state.searchPitem)
    }
  }

  render() {
    const { classes } = this.props;
    const { selected } = this.state;
    const { isFetching } = this.props.todos;
    let gridListItems = '';
    if(this.state.selected == 'repositories'){
      gridListItems = <div>{
        isFetching && <div className={classes.loaderroot}>
        <CircularProgress color="secondary" />
      </div>
      }
      {this.props.todos.UIdata.length != 0 ?(
      <div className={classes.root1}>
      <GridList cellHeight={180} cols={3} className={classes.gridList} >
        {this.props.todos.UIdata.map((tile) => (
          <GridListTile key={tile.id}>
            <img src={tile.owner.avatar_url} alt={tile.owner.login} />
            <GridListTileBar
              title={tile.owner.login}
              subtitle={<span>by: {tile.owner.login}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${tile.owner.login}`} className={classes.icon}/>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>):<p>No Data</p>}
    </div>
    }else{
      gridListItems = <div>{
        isFetching && <div className={classes.loaderroot}>
        <CircularProgress color="secondary" />
      </div>
      }
      {this.props.todos.UIdata.length != 0 ?(
      <div className={classes.root1}>
      <GridList cellHeight={180} cols={3} className={classes.gridList}>
        {this.props.todos.UIdata.map((tile) => (
          <GridListTile key={tile.id}>
            <img src={tile.avatar_url} alt={tile.login} />
            <GridListTileBar
              title={tile.login}
              subtitle={<span>by: {tile.login}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${tile.login}`} className={classes.icon}/>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>):<p>No Data</p>}
    </div>
    }
    return (
      <div>
      <div style={{display: 'flex', alignItems: 'center',justifyContent: 'center',}}> 
      
        <TextField id="standard-search" 
        label="Start typing to search" 
        value= {this.state.searchPitem} 
        variant="filled"
        onChange = {this.callApis}
        />

        <FormControl variant="filled" className={classes.formControl}>
        <InputLabel htmlFor="filled-age-native-simple">Type</InputLabel>
        <Select
          native
          value={selected}
          onChange={event => this.handleChange(event.target.value)}
          inputProps={{
            id: 'filled-age-native-simple',
          }}
        >
          <option value={""}>-Select-</option>
          <option value={"users"}>Users</option>
          <option value={"repositories"}>Repositories</option>
        </Select>
      </FormControl>
</div>
   {this.state.searchPitem != "" ? gridListItems : <p>No Data</p>}
   
      </div>
    );
  }
}

Searcher.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
      todos: state.DataReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
      ...bindActionCreators({ fetchToDos }, dispatch)
  }
}

export default compose(withStyles(styles),connect(mapStateToProps, mapDispatchToProps))(Searcher);
