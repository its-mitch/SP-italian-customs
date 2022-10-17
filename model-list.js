let marche="Bmw,GasGas,Honda,Hrd,Husaberg,Husqvarna,Kram-it,Ktm,Tm,Vor,Yamaha"

let modelli = "Bmw F 650 650 1994-2007,GasGas Ec 125 1996-1999,GasGas Ec 250 1996-1999,GasGas Ec 300 1996-1999,GasGas Mc 125 1996-1999,GasGas Mc 250 1996-1999,GasGas Mc 300 1996-1999,Honda Dominator Nx 650 1997-2004,Honda Slr 650 1996-1999,Honda Vigor 650 1999,Hrd Gs 250 1997,Husaberg Fc 450 1994-2005,Husaberg Fc 501 1999-2003,Husaberg Fc 550 2001-2005,Husaberg Fc 600 1994-2003,Husaberg Fc e 470 2001-2002,Husaberg Fe 350 1994-1999,Husaberg Fe 400 1998-2003,Husaberg Fe 450 2004-2005,Husaberg Fe 501 1994-1998,Husaberg Fe e 501 1999-2004,Husaberg Fe e 550 2004-2005,Husaberg Fe e 600 1999-2002,Husaberg Fe e 650 2001-2005,Husaberg Fe s 501 1999-2004,Husaberg Fe supermotard 600 1999-2003,Husaberg Fs c 400 2001-2003,Husaberg Fs e 400 2001-2003,Husaberg Fs e-c 450 2003-2004,Husaberg Fs e-c 450 2005-2008,Husaberg Fs e-c 650 2001-2008,Husaberg Fx e 450 2003-2005,Husaberg Fx e 470 2001-2002,Husaberg Fx F 650 2001-2005,Husqvarna Cr 125 2000-2004,Husqvarna Cr 250 1995-2005,Husqvarna Nox 570 2001-2003,Husqvarna Sm 610 2005-2006,Husqvarna Smr 450 2003-2005,Husqvarna Smr 510 2005-2008,Husqvarna Smr 570 2000-2004,Husqvarna Smr Seel Replica 630 2004-2005,Husqvarna Sms 125 1995-2008,Husqvarna Sms ie 610 2007-2008,Husqvarna Tc 510 2002-2004,Husqvarna Tc 570 2000-2003,Husqvarna Tc 610 1995-2004,Husqvarna Te 350 1995-1996,Husqvarna Te 410 1995-2001,Husqvarna Te 450 2002-2005,Husqvarna Te 570 2001-2004,Husqvarna Te 610 1995-2005,Husqvarna Te Centenario 510 2004,Husqvarna Wr 125 1995-2005,Husqvarna Wr 250 1995-2004,Husqvarna Wr 360 1995-2004,Husqvarna Wre 125 1995-2008,Kram-it Gs 250 1997,Kram-it Mx 250 1997,Kram-it Sm 250 1997,Kram-it Smr 250 2000,Ktm Adventure 620 1997-1998,Ktm Duke 620 1995-1998,Ktm Duke II 640 1999-2006,Ktm Egs 400 1996-1999,Ktm Exc 125 1998-2003,Ktm Exc 200 2000-2002,Ktm Exc 250 1998-2003,Ktm Exc 300 1997-2003,Ktm Exc 380 1998-2002,Ktm Exc f 400 1994-2003,Ktm Exc f 450 2003,Ktm Exc f 520 2000-2002,Ktm Exc f 525 2003,Ktm Gs 125 1994-1997,Ktm Gs 250 1994-1997,Ktm Gs 300 1995-1996,Ktm Lc4 620 1996-2002,Ktm Lc4 Adventure 640 1998-2007,Ktm Lc4 Enduro 640 1999-2007,Ktm Lc4 Supercomp 620 1998-2004,Ktm Lc4 Supercomp 625 2002,Ktm Lc4 Supermoto 625 2002-2004,Ktm Lc4 Supermoto 640 1998-1999,Ktm Lc4 Supermoto 640 2000-2003,Ktm Lc4 Supermoto 640 2004-2007,Ktm Smc 625 2005-2008,Ktm Smc 660 2003-2007,Ktm Smr 630 2004-2005,Ktm Super Duke 990 2005-2007,Ktm Supermoto 690 2007-2008,Ktm Sx 125 1994-2003,Ktm Sx 250 1998-2002,Ktm Sx 300 1997-2003,Ktm Sx 380 1998-2002,Ktm Sx 500 1995-1998,Ktm Sxf 400 2000-2002,Ktm Sxf 525 2003,Tm En 80 1993-2002,Tm En 125 1998-2002,Tm En 250 1998-2002,Tm Gs 125 1993-1997,Tm Gs 250 1995-1997,Tm Mc 80 1993-1997,Tm Mc 125 1993-1997,Tm Mc 250 1995-1997,Tm Mx 125 1998-2002,Tm Mx 250 1998-2001,Vor En 400 2000-2002,Vor En 450 2000-2003,Vor En 492 1998-1999,Vor En 503 2000-2002,Vor Mx 400 2000-2002,Vor Mx 495 1998-1999,Vor Mx 503 2000-2002,Vor Sm 400 2000-2002,Vor Sm 503 2000-2002,Vor Sm Rc 450 2002,Vor Sm Rc 530 2000-2002,Yamaha TTE 600 1993-2001,Yamaha TTR 600 1997-2004,Yamaha TTS 600 1993-2001,Yamaha Xt-r 660 2004-2006,Yamaha Xt x 660 2004-2007,Yamaha Xtz Teneré 660 2008"

let arrMake=marche.split(",");
let arrMod=modelli.split(",");

let compMatrix=[["Marca","Modello",2000,2003]];

console.log(arrMake.length);
var i=0;
for(i;i<=arrMake.lenght;i++){
    console.log(compMatrix[i][0]);
    console.log(arrMake[i]);
    compMatrix[i][0]=arrMake[i];
    console.log(compMatrix[i][0]);
    console.log(arrMake[i]);
}

console.log("Array Marche:");
console.log(arrMake);
//console.log("Array Modelli:");
//console.log(arrMod);
console.log("Matrice");
console.log(compMatrix);