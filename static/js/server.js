const socket = io()

const address = window.location.href.split('/')[window.location.href.split('/').length-1]

socket.emit('ready', address)

socket.on(`new-chat-message:${address}`, message => {
  var chat = document.getElementById('chat')

  const { author, content } = message

  var chat_message = document.createElement('div')

  chat_message.innerHTML = `<span>[</span>${generateColoredHTML(author)}<span>]: </span>${generateColoredHTML(content)}`

  chat.append(chat_message)
})

socket.on(`map-update:${address}`, map => {
  const { name, author } = map

  var map_name = document.getElementById('map-name')
  var map_author = document.getElementById('map-author')

  map_name.innerHTML = generateColoredHTML(name)
  map_author.innerHTML = generateColoredHTML(author)
})

socket.on(`player-list-update:${address}`, list => {
  var player_list = document.getElementById('player-list')

  player_list.innerHTML = ""
  for(player of list){
    var player_name = document.createElement('p')
    player_name.innerHTML = generateColoredHTML(player.username)
    player_list.append(player_name)
  }
})

socket.on(`name-update:${address}`, server_name => {
  var name = document.getElementById('name')

  name.innerHTML = generateColoredHTML(server_name)

  console.log(name.innerHTML)
})

// function generateColoredHTML(text){
//   if(!text) return undefined
//   var texts = text.split(/\[\w+\]/g).filter(t => t.length > 0);

//   var colors = Array.from(text.split(/(\]|^)\w+(\[|$)/g).map((c) => c.match(/\w+/g))).filter(($) => !!$).flat();

//   var array = texts.map((t, i) => ({ color: colors[text.startsWith("[") ? i : i - 1], text: t }));

//   var html = ""

//   for(group of array){
//     html += `<span style="color:${group.color}">${group.text}</span>`
//   }

//   return html.toString()
// }

let generateColoredHTML = Input => {
  let HTML = '', OPEN;
  while (Input) {
    if (Input.charAt(0) == '[') {
      HTML += `${OPEN ?'</span>':''}<span style="color:${Input.slice(1, Input.indexOf(']'))}">`;
      OPEN = true;
      Input = Input.slice(Input.indexOf(']')+1);
      continue;
    }
    HTML += Input.charAt(0);
    Input = Input.slice(1);
  }
  if (OPEN) HTML += '</span>';
  return HTML;
}