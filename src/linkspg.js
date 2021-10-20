// pega links das paginas dos imoveis

const puppeteer = require('puppeteer');

const urlalvo = "https://sp.olx.com.br/regiao-de-sorocaba/regiao-de-sorocaba/imoveis/aluguel?pe=1000&sf=1";

async function linkspg(lkPesquisa){
    const dados = [];
    const browser = await puppeteer.launch({
        defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto(lkPesquisa);

    const options = await page.$$eval(".sc-1fcmfeb-1.kntIvV > li > a", (opts) => 
    opts.map((Option) => Option.attributes[6].nodeValue)
    );

    await browser.close();

    await options.map((lnk) =>{
        const olnk = lnk;
        dados.push(olnk);
    })

   //await console.log(dados);
   return dados;

}

//linkImoveis(urlalvo);

module.exports = linkspg;