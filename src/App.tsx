import { Admin, Resource, ShowGuesser, EditGuesser } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import PostList from "./pages/posts/post-list";
import PostShow from "./pages/posts/post-show";
import UserList from "./pages/users/user-lists";
import PostEdit from "./pages/posts/post-edit";
import PostCreate from "./pages/posts/post-create";

import ArticleIcon from "@mui/icons-material/Article";
import Person from "@mui/icons-material/Person";
import HomePage from "./pages/homePage";
import authProvider from "./authProvider";

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider} dashboard={HomePage} authProvider={authProvider}>
    <Resource
    icon={ArticleIcon}
      name="posts"
      list={PostList}
      show={PostShow}
      edit={PostEdit}
      create={PostCreate}
    />
    <Resource
    icon={Person}
      name="users"
      list={UserList}
      show={ShowGuesser}
      edit={EditGuesser}
    />
  </Admin>
);
