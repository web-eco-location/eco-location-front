import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { AppBar, Button, Container, Grid, IconButton, List, Paper, Toolbar, Typography } from '@material-ui/core';
import './App.css';
import { call, signout } from './service/ApiService';
import { DeleteOutlined } from '@material-ui/icons';

class AreaPotential extends React.Component {
  constructor(props) {  
    super(props);
    this.state = {
      items: [],
      loading: true,
    };
  }

  // deleteAllEventHandler = (e) => {
  //   this.state.items.forEach((item) => {
  //     if(item.done) {
  //       this.delete(item);
  //     }
  //   });
  // }
  
  // componentDidMount() {
  //   call("/todo", "GET", null).then((response) =>
  //     this.setState({items:response.data, loading:false})
  //   );
  // }
  
  render() {
    var todoItems = this.state.items.length>0 && (
      <Paper style={{margin:16}}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item={item} key={item.id} delete={this.delete} update={this.update}/>
          ))}
        </List>
      </Paper>
    );

    var navigationBar = (
      <AppBar position='static'>
        <Toolbar>
          <Grid justifyContent='space-between' container>
            <Grid item>
              <Typography variant='h6'>오늘의 할일</Typography>
            </Grid>
            <Grid item>
              <Button color='inherit' onClick={signout}>logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );

    var todoListPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className='TodoList'>{todoItems}</div>
          Delete Completed Item
          <IconButton aria-label="Delete"
              onClick={this.deleteAllEventHandler}>
              <DeleteOutlined />
          </IconButton>
        </Container>
      </div>
    );

    var loadingPage = <h1>로딩중...</h1>
    var content = loadingPage;

    if(!this.state.loading) {
      console.log("loading end");
      content = todoListPage;
    }

    return(
      <div className='App'>
        {content}
      </div>
    );
  }
}

export default AreaPotential;
