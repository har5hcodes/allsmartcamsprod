import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  ChannelDetail,
  VideoDetails,
  SearchFeed,
  Navbar,
  Feed,
  BookFeed,
} from "./components";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import BookUpload from "./pages/BookUpload";
import ContactForm from "./components/ContactForm";

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route exact path="/" element={<Feed />} />
      <Route exact path="/books" element={<BookFeed />} />
      <Route path="/video/:id" element={<VideoDetails />} />
      <Route path="/channel/:id" element={<ChannelDetail />} />
      <Route
        path="/search/:searchTerm/:searchOption"
        element={<SearchFeed />}
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/bookupload" element={<BookUpload />} />
      <Route path="/contact" element={<ContactForm />} />
    </Routes>
  </BrowserRouter>
);

export default App;
