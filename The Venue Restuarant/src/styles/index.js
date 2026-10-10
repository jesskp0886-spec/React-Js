import main from './main_styles.css?inline';
import mainResponsive from './responsive.css?inline';
import about from './about.css?inline';
import aboutResponsive from './about_responsive.css?inline';
import menu from './menu.css?inline';
import menuResponsive from './menu_responsive.css?inline';
import blog from './blog.css?inline';
import blogResponsive from './blog_responsive.css?inline';
import contact from './contact.css?inline';
import contactResponsive from './contact_responsive.css?inline';
import blogExtra from './blog_extra.css?inline';

export const pageStyles = {
  home: [main, mainResponsive],
  about: [about, aboutResponsive],
  menu: [menu, menuResponsive],
  contact: [contact, contactResponsive],
  // blog list, blog details, admin and 404 pages share the blog stylesheet
  blog: [blog, blogResponsive, blogExtra],
};
