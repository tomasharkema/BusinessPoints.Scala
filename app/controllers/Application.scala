package controllers

import play.api._
import play.api.mvc._
import play.twirl.api.Html

trait HtmlElement {
  def html: Html
}

case object AddButton extends HtmlElement {
  def html = views.html.buttons.add()
}

case object RemoveButton extends HtmlElement {
  def html = views.html.buttons.remove()
}

object Application extends Controller {

  def index = Action {
    Ok(views.html.main("Business Points") {
        Seq(views.html.page("Business Points", "businesspointslistpage", Some(AddButton)) {
          Seq(
            views.html.list(id = "businesspointslist")
          )
        }, views.html.page("Add Business Point", "add", Some(RemoveButton)) {
          Seq(views.html.add())
        })
    })
  }

}