import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
import swal from "sweetalert";
import CardProduct from "../components/CardProduct";
import Categories from "../components/Categories";
import numberWithCommas from "../utils/utils";
import { API_URL } from "../config/API_URL.js";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";

export default class Home extends Component {
  state = {
    menus: [],
    categoryYangDipilih: "Makanan",
    keranjangs: [],
    user: "",
  };

  refreshKeranjangs = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        this.setState({
          keranjangs: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoryYangDipilih)
      .then((res) => {
        this.setState({
          menus: res.data,
          // user: JSON.parse(localStorage.getItem('user'))
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.refreshKeranjangs();
  }

  changeCategory = (value) => {
    this.setState({
      categoryYangDipilih: value,
      menus: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        this.setState({
          menus: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  masukKeranjang = (value) => {
    axios.get(API_URL + "keranjangs?product.id=" + value.id).then((res) => {
      if (res.data.length === 0) {
        const keranjang = {
          jumlah: 1,
          totalHarga: value.harga,
          product: value,
        };
        axios
          .post(API_URL + "keranjangs", keranjang)
          .then((res) => {
            swal({
              title: "Sukses!",
              text: `sukses memasukkan ${value.nama} ke keranjang`,
              icon: "success",
              button: false,
              timer: 1000,
            });
            this.refreshKeranjangs();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const keranjang = {
          jumlah: res.data[0].jumlah + 1,
          totalHarga: res.data[0].totalHarga + value.harga,
          product: value,
        };
        axios
          .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
          .then((res) => {
            swal({
              title: "Sukses!",
              text: `sukses memasukkan ${value.nama} ke keranjang`,
              icon: "success",
              button: false,
              timer: 1000,
            });
            this.refreshKeranjangs();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  render() {
    const totalBayar = this.state.keranjangs.reduce(function (result, item) {
      return result + item.totalHarga;
    }, 0);
    return (
      <div>
        <Container fluid>
          <Row className="mt-4">
            <Categories changeCategory={this.changeCategory} categoryYangDipilih={this.state.categoryYangDipilih} />
            <Col md={7}>
              <Row className="products">
                <p className="text-center">
                  <b>products</b>
                </p>
                <hr />
                {this.state.menus.map((menu, index) => {
                  return <CardProduct menu={menu} key={index} masukKeranjang={this.masukKeranjang} />;
                })}
              </Row>
            </Col>
            {/* <Hasil keranjangs={this.state.keranjangs} {...this.props} refreshKeranjangs={this.refreshKeranjangs} /> */}
            {this.state.keranjangs.length > 0 && (
              <Col md={{ span: 3, offset: 9 }} style={{ position: "fixed", bottom: "0px" }}>
                <h5>
                  <span style={{ float: "left" }}>Total : </span>
                  <strong style={{ float: "right" }}>Rp.{numberWithCommas(totalBayar)}</strong>
                </h5>
                <Link to="/keranjang">
                  <Button
                    variant="success"
                    className="mb-2 mt-2"
                    size="md"
                    style={{ width: "100%" }}
                    onClick={() => {
                      this.handleSubmit(totalBayar);
                    }}
                  >
                    Keranjang <Badge bg="primary">{this.state.keranjangs.length}</Badge>
                  </Button>
                </Link>
              </Col>
            )}
          </Row>
        </Container>
      </div>
    );
  }
}
