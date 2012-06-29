// Generated by CoffeeScript 1.3.3
(function() {

  $(document).ready(function() {
    var page;
    console.log("here we go...");
    window.editor = new EpicEditor({
      basePath: "/static/EpicEditor/epiceditor"
    });
    editor.load();
    page = getPageDefaults();
    $(".page-link-title-original").val(page.link_title);
    setPage(page);
    renderPage(page);
    $("#preview-button").click(function(e) {
      page = getPage();
      setPage(page);
      $("#view").show();
      return $("#add_edit").hide();
    });
    $("#edit-button").click(function(e) {
      $("#view").hide();
      return $("#add_edit").show();
    });
    $("#save-button").click(function(e) {
      var modal, original_link_title, save;
      page = getPage();
      original_link_title = $(".page-link-title-original").val();
      console.log("lt: " + page.link_title);
      console.log("olt: " + original_link_title);
      save = function(page, success_callback) {
        console.log("saving ", page);
        return $.ajax({
          type: 'POST',
          url: "/pages/" + original_link_title + "/edit",
          data: page,
          success: function(e) {
            console.log("successful postback :)");
            if (e.redirect_url != null) {
              window.location.href = e.redirect_url;
            }
            if (success_callback != null) {
              return success_callback(e);
            }
          },
          dataType: "json"
        });
      };
      if (original_link_title != page.link_title) {
        console.log("link title changed");
        modal = $("#confirm-change-link-title-modal");
        modal.modal('show');
        return modal.find(".btn-primary").click(function(e) {
          return save(page, function(e) {
            return modal.modal('hide');
          });
        });
      } else {
        return save(page);
      }
    });
    $(this).keydown(function(e) {
      return console.log("Keycode: " + e.keyCode);
    });
    return $(".page-type").change(function(e) {
      console.log("page type changed");
      page = getPage();
      return renderPage(page);
    });
  });

  window.renderPage = function(page) {
    $("#view").hide();
    if (page.type === "custom") {
      $(".if-custom-page").show();
      return $(".if-not-custom-page").hide();
    } else {
      $(".if-not-custom-page").show();
      return $(".if-custom-page").hide();
    }
  };

  window.setPage = function(data) {
    $(".page-link-title").val(data.link_title);
    $(".page-title").val(data.title).text(data.title);
    $(".page-subtitle").val(data.subtitle).text(data.subtitle);
    $(".page-type").val(data.type);
    editor.setContents(data.content);
    return void 0;
  };

  window.getPage = function() {
    var data;
    data = {
      link_title: $("input.page-link-title").val(),
      title: $("input.page-title").val(),
      subtitle: $("input.page-subtitle").val(),
      type: $("select.page-type").val(),
      content: editor.getContents()
    };
    return data;
  };

}).call(this);
