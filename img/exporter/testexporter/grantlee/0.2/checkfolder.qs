lastName = "";
firstTime = true;
// the filter function
var isSame = function(input)
{
  var input = input.rawString();
  var index = input.indexOf("/");
  var folder = input.substring(0, index);
  var same = lastName==folder;
  lastName = folder;
  return same?"true":"";
};

var isFirst = function(input)
{
  if(firstTime==true) {
  	firstTime = "runned";
  	return "true";
  }
  	return "";
};

// the filter function
var getName = function(input)
{
  var input = input.rawString();
  var index = input.indexOf("/");
  var folder = input.substring(0, index);
  return folder;
};
 
// the filter name
isFirst.filterName = "isfirst";
isSame.filterName = "issame";
getName.filterName = "getname";
 
// register the filter
Library.addFilter("isFirst");
Library.addFilter("isSame");
Library.addFilter("getName");