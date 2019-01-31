var data = require("../pppdf/overView.json");

var fs = require("fs");
var conversion = require("phantom-html-to-pdf")();

function title() {
  return `<h1 style="text-align: center;"><b> Offer for Development of Disk In Pro NEAR phase 2 web app </b></h1><br />`;
}

function overView() {
  var arr = `<p style = 'margin-bottom: 20px;font-size: 20px;' ><b> Overview</b></p>`;
  {
    data.overView.map(elm => {
      arr += `<p>${elm}</p>`;
    });
  }
  return arr;
}

function service() {
  var arr = ` <ul>`;
  {
    data.servicesList.map(elm => {
      arr += `<li>${elm}</li>`;
    });
  }
  arr += `</ul>`;
  return arr;
}

function images() {
  var arr = `<table style= 'text-align: center; sans-serif;  border-collapse: collapse; width: 90%; margin:auto;'>
    `;
  var counter = 0;
  for (let i = 0; i < data.imgUrlLink.length / 4; i++) {
    arr += `<tr>`;
    for (let j = 1; j < data.imgUrlLink.length / 2 + 1; j++) {
      arr += `<td><img  src=${
        data.imgUrlLinks[counter]
      } alt="" width="125" /></td>`;
      counter += 1;
    }
    arr += `</tr>`;
  }
  arr += `</table>`;
  return arr;
}

function pdfGenerator() {
  console.log("i");
  var arr = `${title()}
    ${overView()}
    ${service()}
    ${images()}
    
    `;

  return arr;
}

conversion({ html: pdfGenerator() }, function(err, edf) {
  var output = fs.createWriteStream("aaa43.pdf");
  console.log(pdf.logs);
  console.log(pdf);
  // console.log(pdf.numberOfPages);
  // since pdf.stream is a node.js stream you can use it
  // to save the pdf to a file (like in this example) or to
  // respond an http request.
  edf.stream.pipe(output);
});
