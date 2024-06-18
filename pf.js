<script type="text/javascript">
function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

var reqUriParam = '_xfRequestUri=' + encodeURIComponent(window.location.pathname);
var token = '_xfToken=' + document.querySelector('html').getAttribute('data-csrf');

var box = getElementByXpath("//div[contains(@class, 'copyright-left')]/p");

var elements = document.querySelectorAll('a[data-preview-url]');
elements.forEach( e => {
  var previewUrl = e.getAttribute('data-preview-url');
  var url = previewUrl + '?' + reqUriParam + '&_xfWithData=1&' + token + '&_xfResponseType=json';

  var d = e.parentNode;
  
  var createA = document.createElement('a');
  var createAText = document.createTextNode('PREVIEW');
  //createA.setAttribute('href', '#');
  createA.setAttribute('data-href', url);
  //createA.setAttribute('target', '_blank');
  createA.style.color = 'red';
  createA.appendChild(createAText);
  d.appendChild(createA);

  createA.addEventListener('click', event => {
    url = event.srcElement.getAttribute('data-href');
    event.preventDefault();
    event.stopImmediatePropagation();


    fetch(url).then(res => res.json())
      .then(json => {
        box.innerHTML = json.html.content;
        window.scroll(0, box.offsetTop);
      });
    
    return false;
  });
})

</script>
