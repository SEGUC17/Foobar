<template>
<header>
  <div class="container clearfix">
    <div class="row">
          <div class="span12">
        <div class="navbar navbar_">
              <div class="container">
            <h1 class="brand brand_"><a href="index.html"><img alt="" src="./assets/img/logo.png" style ="height:70px"> </a></h1>
            <a class="btn btn-navbar btn-navbar_" data-toggle="collapse" data-target=".nav-collapse_">Menu <span class="icon-bar"></span> </a>
            <div class="nav-collapse nav-collapse_  collapse">
                  <ul class="nav sf-menu">
<<<<<<< Updated upstream
                <li class="active"><a href="index.html">Home</a></li>
                <li><a href="work.html">Work</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li class="sub-menu"><a href="process.html">Process</a>
                      <ul>
                    <li><a href="#">Process 01</a></li>
                    <li><a href="#">Process 02</a></li>
                    <li><a href="#">Process 03</a></li>
                  </ul>
                    </li>
                <li><a data-toggle="modal" data-target="#myModal">Enter</a></li>
=======
                <li class="active"><router-link to="/">Home</router-link></li>
                <li ><router-link to="/announcements">Announcements</router-link></li>
                <li ><router-link to="/StudentProfile"> Offers</router-link></li>
                <li ><router-link to="/sPs">  SPS</router-link></li>
>>>>>>> Stashed changes
              </ul>
                </div>
          </div>
            </div>
      </div>
        </div>
  </div>

  <div class="modal hide fade" id ="myModal">

  <div class="modal-body" style="padding-left:6%">
  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <div class="row">
                    <div class="col-md-8" style="">
                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs">
                            <li class="active"><a href="#Login" data-toggle="tab">Login</a></li>
                            <li><a href="#Registration" data-toggle="tab">Registration</a></li>
                        </ul>
                        <!-- Tab panes -->
                        <div class="tab-content">
                            <div class="tab-pane active" id="Login">
                                <center>
                                <form role="form" class="">
                                <div class="form-group">
                                    <label for="email" class="col-sm-2 control-label">
                                        Email</label>
                                    <div class="col-sm-10">
                                        <input type="email" class="form-control" id="email1" placeholder="Email" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1" class="col-sm-2 control-label">
                                        Password</label>
                                    <div class="col-sm-10">
                                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-2">
                                    </div>
                                    <div class="col-sm-10">
                                        <button type="submit" class="btn btn-primary btn-sm">
                                            Submit</button>
                                            <br>
                                        <a href="javascript:;">Forgot your password?</a>
                                    </div>
                                </div>
                                </form>
                             </center>
                            </div>
                            <div class="tab-pane" id="Registration">
                                <center>
                                <form role="form" class="">
                                <div class="form-group">
                                    <label for="email" class="col-sm-2 control-label">
                                        Email</label>
                                    <div class="col-sm-10">
                                        <input type="email" class="form-control" id="email" placeholder="Email" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="password" class="col-sm-2 control-label">
                                        Password</label>
                                    <div class="col-sm-10">
                                        <input type="password" class="form-control" id="password" placeholder="Password" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-2">
                                    </div>
                                    <div class="col-sm-10">
                                        <button type="button" class="btn btn-primary btn-sm">
                                            Save & Continue</button>
                                    </div>
                                </div>
                                </form>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
  </div>

</div>


  </header>

</template>
