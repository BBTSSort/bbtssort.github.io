﻿function OpenWnd() {
  var oWindow = window.open("", ""); 
  with (oWindow.document) {
    write("<html>");
    write("<head>");
    write("<title>Broken By The Scream Sort: Raw Text Results<\/title>");
    write("<style>");
		write("body { background-color: #000; color: #fff; font-family: \"Helvetica Neue\",Helvetica,Arial,sans-serif; font-size: 15px; }");
		write("<\/style>");
    write("<\/head>");
    write("<body>");
    write(csort5);
    write("<hr>");
    write("<input type='button' value='Close' onclick='window.close()'>");
    write("<hr>");		
		write("<\/body>");
    write("<\/html>");
    close(); 
  }
}