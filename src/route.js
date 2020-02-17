import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ListUserPage from "pages/user/list.js"
import UserDetailPage from "pages/user/detail.js"
import CreateUserPage from "pages/user/create.js"
import EditUserPage from "pages/user/edit.js"
import Layout from "components/layouts/index.js"

const pages = [
    {path: "/",component: ListUserPage , private: false},
    {path: "/user/:id/edit",component: EditUserPage , private: false},
    {path: "/user/create",component: CreateUserPage , private: false},
    {path: "/user/:id",component: UserDetailPage , private: false},
    {path: "/user",component: ListUserPage , private: false},
]

export default function Root() {
    return (
    <Router>
        <Layout>
            <Switch>
                {pages.map((Page, index) =>  ( <Route exact={index === 0} key={Page.path} path={Page.path} component={Page.component}/> ))}
            </Switch>
        </Layout>
    </Router> )
}