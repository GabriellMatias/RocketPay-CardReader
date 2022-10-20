import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")
function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    rocketseat: ["#0D6F5D", "#C3129C"],
    default: ["black", "gray"],
  }
  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}

globalThis.setCardType = setCardType

const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000"
}
const securityCodeMask = IMask(securityCode, securityCodePattern)


const expirationDate = document.querySelector("#expiration-date");
const expirationPattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),

    }

  }
}
const expirationDateMask = IMask(expirationDate, expirationPattern)



const cardNumber = document.querySelector("#card-number");

const cardNumberPattern = {
  mask: [
    {
      mask: '0000 000000 00000',
      regex: /^3[47]\d{0,13}/,
      cardtype: 'american express'
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
      cardtype: 'discover'
    },
    {
      mask: '0000 000000 0000',
      regex: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
      cardtype: 'diners'
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
      cardtype: 'mastercard'
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^(?:35\d{0,2})\d{0,12}/,
      cardtype: 'jcb'
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,
      cardtype: 'maestro'
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^4\d{0,15}/,
      cardtype: 'visa'
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  /* docs*/
  dispatch: function (append, dynamicMasked) {
    /* aceitando apenas numbers*/
    const number = (dynamicMasked.value + append).replace(/\D/g, "")

    const findMask = dynamicMasked.compiledMasks.find((item) => {
      /* encontrando cartao que segue as regras do regex*/
      return number.match(item.regex)

    })

    return findMask

  }
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

/* pega input*/
const titularName = document.querySelector("#card-holder")


//Aula 02 - adicionando eventos da DOM

titularName.addEventListener("input", () => {
  const ccHolderName = document.querySelector(".cc-holder .value")
  /*mudando valores dentro do html*/

  ccHolderName.innerHTML = titularName.value.length === 0 ? "Fulano" : titularName.value
})


// adicionando evento ao botao
const Button = document.querySelector("#addCard")
Button.addEventListener("click", () => {
  event.preventDefault()

})


// modificando security code do cartao no HTML de acordo com o digito do usuario
securityCodeMask.on("accept", () => {
  onUpdateSecurityCode(securityCodeMask.value)

})
function onUpdateSecurityCode(code) {
  const ccSecurity = document.querySelector(".cc-security .value")

  ccSecurity.innerHTML = code.length === 0 ? '123' : code
}


//modificando numero do cartao de acordo com o digito do usuario
cardNumberMasked.on("accept", () => {
  
  const cardtype = cardNumberMasked.masked.currentMask.cardtype

  setCardType(cardtype)
  
  onUpdateCardNumber(cardNumberMasked.value)
})

function onUpdateCardNumber(number) {
  const ccNumber = document.querySelector(".cc-number")
  ccNumber.innerHTML = number.length === 0 ? '1234 5678 9012 3458' : number
}

expirationDateMask.on("accept", () => {
  onUpdateExpirationDate(expirationDateMask.value)

})
function onUpdateExpirationDate(date) {
  const ccExpiration = document.querySelector(".cc-extra .value")
  ccExpiration.innerHTML = date.length ===0? '02/22' :date
}