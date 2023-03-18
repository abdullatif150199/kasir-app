import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        swal({
          title: "Login Berhasil",
          text: `Selamat! Anda Berhasil Login`,
          icon: "success",
          button: false,
          timer: 2000,
        });
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/");
      })
      .catch((err) => {
        console.info(err);
        if (err) {
          alert(err.message);
        }
      });
  };

  const handleEmailPasswordLogin = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        swal({
          title: "Login Berhasil",
          text: `Selamat! Anda Berhasil Login`,
          icon: "success",
          button: false,
          timer: 2000,
        });
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/");
      })
      .catch((err) => {
        if (err) {
          const errorMessage = err.message.replace("Firebase: ", "");
          alert(errorMessage);
        }
        console.error(err);
      });
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)" }}>
      <div className="col-md-4 col-8 d-flex flex-column   justify-content-center align-items-center text-center py-5" style={{ backgroundColor: "#022233", borderRadius: "20px", padding: "0px" }}>
        <h3 className="text-white">Form Login</h3>
        <div className="col-md-8 col-8 mt-5">
          <input className="input w-100 text-white" id="email" name="email" placeholder="Email" type="text" onChange={(e) => setEmail(e.target.value)} style={{ backgroundColor: "#022233" }} />
          <br />
          <input className="input w-100 mt-2 text-white" id="password" name="password" placeholder="Password" type="Password" onChange={(e) => setPassword(e.target.value)} style={{ backgroundColor: "#022233" }} />
          <br />
          <button className="btn btn-primary mt-5 w-100" onClick={handleEmailPasswordLogin}>
            Login
          </button>
          <button className="btn btn-light mt-2 w-100" onClick={handleGoogleLogin}>
            Login Dengan Google
          </button>
          <p className="text-white mt-2">
            Anda Belum Registrasi?
            <Link to="/register" className="text-decoration-none">
              Registrasi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
