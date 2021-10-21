// Extrai dados individuais de pagina

const { url } = require('inspector');
const puppeteer = require('puppeteer');
const linkspg = require('./linkspg');
const express = require("express")
const app = express();

const urlalvo = "https://sp.olx.com.br/regiao-de-sorocaba/regiao-de-sorocaba/imoveis/aluguel?pe=1000&sf=1";
let detalhesImovel = [];

const main = async () =>{
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        //headless:false,
    });
    
    const page = await browser.newPage();

    const urls = await linkspg(urlalvo);
    for(let i=0; i < urls.length; ++i){
        const url = urls[i];
        
        await page.goto(url);
        await page.waitForTimeout(3000);
        const nome = await page.$eval('.sc-45jt43-0.eCghYu.sc-ifAKCX.cmFKIN', (el) => el.textContent);
        const valor = await page.$eval('.sc-ifAKCX.eQLrcK', (el) => el.textContent);
        const codigoBruto = await page.$eval('.sc-16iz3i7-0.qJvUT.sc-ifAKCX.fizSrB', (el) => el.textContent);
        const codigo = codigoBruto.replace(/\D/gim, ''); // Limpa string de codigo apagando apenas numeros
        const urlImovel = await page.url();
        const detalhesArray = await page.$$('.duvuxf-0.h3us20-0.jyICCp');
        for (let detalhesElement of detalhesArray){
            let detalhesImv = await detalhesElement.$eval('.sc-hmzhuo.sc-1f2ug0x-3.ONRJp.sc-jTzLTM.iwtnNi', element => element.innerText);
            const detalhes = await detalhesImv.replace('\n', ' : ');
            detalhesImovel.push(detalhes);
        }
        
        await console.log({nome, valor, urlImovel, codigo, detalhesImovel});
        detalhesImovel = [];
    }
   
    await browser.close();
}
app.get("/"), function (req, res){
    res.send("teste")
}

app.listen(process.env.PORT || 5000);
main();



/*
const urlalvo = "https://sp.olx.com.br/regiao-de-sorocaba/imoveis/boituva-apartamento-padrao-centro-946254667";

let detalhesImovel = [];


const wspg = async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        //headless:false,
    });
    const page = await browser.newPage();

    
    await page.goto(urlalvo);
    await page.waitForTimeout(3000);
    const nome = await page.$eval('.sc-45jt43-0.eCghYu.sc-ifAKCX.cmFKIN', (el) => el.textContent);
    const valor = await page.$eval('.sc-ifAKCX.eQLrcK', (el) => el.textContent);
    const codigoBruto = await page.$eval('.sc-16iz3i7-0.qJvUT.sc-ifAKCX.fizSrB', (el) => el.textContent);
    const codigo = codigoBruto.replace(/\D/gim, ''); // Limpa string de codigo apagando apenas numeros
    const urlImovel = urlalvo;
    const detalhesArray = await page.$$('.duvuxf-0.h3us20-0.jyICCp');
    for (let detalhesElement of detalhesArray){
        let detalhesImv = await detalhesElement.$eval('.sc-hmzhuo.sc-1f2ug0x-3.ONRJp.sc-jTzLTM.iwtnNi', element => element.innerText);
        const detalhes = await detalhesImv.replace('\n', ' : ');
        detalhesImovel.push(detalhes);
    }

    await console.log({nome, valor, urlImovel, codigo, detalhesImovel});
    
    await browser.close();
}

wspg();

*/