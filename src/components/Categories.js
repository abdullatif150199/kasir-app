import axios from "axios";
import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Col } from "react-bootstrap";
import { API_URL } from "../config/API_URL.js";

// const Icons = (nama) => {
//   if ((nama = cemilan)) {
//     return;
//   }
//   if ((nama = makanan)) {
//     return;
//   }
//   if ((nama = minuman)) {
//     return;
//   }
// };

export default class Categories extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        this.setState({
          categories: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    // const { categories } = this.state;
    return (
      <Col md={2} className="text-center">
        <p>
          <strong>Category Product</strong>
        </p>
        <hr />
        {this.state.categories.map((category, index) => {
          return (
            <ListGroup key={index} className="categories">
              <ListGroup.Item
                onClick={() => {
                  this.props.changeCategory(category.nama);
                }}
                className={this.props.categoryYangDipilih === category.nama && "categoryAktif"}
              >
                {category.nama}
              </ListGroup.Item>
            </ListGroup>
          );
        })}
      </Col>
    );
  }
}
