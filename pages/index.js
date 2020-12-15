import Head from 'next/head'
import React from 'react'
import $ from 'jquery'
import Link from 'next/link'

const budFlowerImage = {
    bud: 'https://i.postimg.cc/4yksQFgt/pngwing-com.png',
    flower: 'https://www.flaticon.com/premium-icon/icons/svg/2926/2926745.svg',
}

const editors = [{name:'TR_Brady', maxPage:4}, {name:'Brandon_Krieg', maxPage:1}, {name:'Annie_Christain', maxPage:4},
                {name:'Lydia_T._Liu', maxPage:1}, {name:'Astra_Papachristodoulou', maxPage:2}, {name:'Mandy_Gutmann_Gonzalez', maxPage:4},
                {name:'Gina_Lee', maxPage:3}, {name:'Rosie_Stockton', maxPage:5}, {name:'Sophia_Terazawa', maxPage:9}]

class Title extends React.Component {
    render () {
        return (
            <div className='header'>
                <div className='title'>Berkeley Poetry Review</div>
                <div className='sub_title'>midterm 4: stasis / static</div>
            </div>
        );
    }
}

class MenuWrapper extends React.Component {
    constructor() {
        super()
        this.state = {
            visible:false,
        }
    }

    handleClick = () => {
        this.setState({visible: !this.state.visible});
        if (this.state.visible) {
            $(".dropdown").css("color", "white");
        } else {
            $(".dropdown").css("color", "grey");
        }
        
    }

    render() {
        return (
            <div>
                <div className="dropdown" onClick={this.handleClick}>{this.state.visible?'Hide Menu':'Show Menu'}</div>
                <div className={this.state.visible?'fadeIn':'fadeOut'} >< MenuBar /></div>
            </div>
        );
    }
}

class MenuBar extends React.Component {
    constructor() {
        super()
        this.state = {
            masthead: false,
            editorNote: false,
            contributors: false,
        }
    }


    render () {
        return (
            <div>
                <div className='menu_bar'>
                    <MenuEntry text={'Masthead'} />
                    <MenuEntry text={'Editor\'s Note'} />
                    <MenuEntry text={'Contributors'}/>
                </div>
                {this.state.masthead ? <Masthead toggle={this.toggleMasthead}/> : null}
                {this.state.editorNote ? <EditorsNote toggle={this.toggleEditorNote}/> : null}
            </div>
        );
    }
}

class MenuEntry extends React.Component {

    constructor(props) {
        super(props);
        console.log('constructed')
    }

    render () {
        const link = '/' + this.props.text.toLowerCase().replace(/\s+|'/g, '');
        return (
          <Link href={link}><a  className="menu_entry" onClick={this.props.toggle}>&#9630; {this.props.text}</a></Link>
        );
    }
}


class PoemBlock extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            flower: false,
            popup: false,
            repeat: true,
        }
    }

    componentDidMount() {
        this.animateDiv('#' + this.props.id);
    }

    toggleImage = () => {
        this.setState({flower: true, popup: !this.state.popup, repeat: false});
    }

    getImageName = () => this.state.flower? 'flower':'bud';

    animateDiv(id) {
        var newq = makeNewPosition();
        var oldq = $(id).offset();
        try {
            var speed = calcSpeed([oldq.top, oldq.left], newq);
            $(id).animate({ top: newq[0] / 1.5, left: newq[1] / 1.5}, speed, function(){
                if (this.state.repeat === true) {
                    this.animateDiv(id); 
                } else {
                    return;
                }
                console.log(this.state.repeat)    
            }.bind(this));

        } catch(e) {
            console.log(e);
        }
    }


    render () {
        const imageName = this.getImageName()
        const editorName = editors[this.props.id].name.replace(/_/g, ' ');
        return (
            <div>
                <div className='poetBlock' id={this.props.id}>
                    <div>{editorName}</div>
                    <img className='bud' src={budFlowerImage[imageName]} onClick={this.toggleImage}/>
                </div>
                {this.state.popup ? <PopUp id={this.props.id} toggle={this.toggleImage} /> : null}
            </div>
        );
    }
}

class PoemBlocks extends React.Component {
    render(){
        return (
            <div>
                <PoemBlock id={0}/>
                <PoemBlock id={1}/>
                <PoemBlock id={2}/>
                <PoemBlock id={3}/>
                <PoemBlock id={4}/>
                <PoemBlock id={5}/>
                <PoemBlock id={6}/>
                <PoemBlock id={7}/>
                <PoemBlock id={8}/>
            </div>
        );
    }
}

class PopUp extends React.Component {
    constructor(props) {
        super(props)
        console.log(props.id)
        this.state = {
            name: editors[props.id].name,
            maxPage: editors[props.id].maxPage,
            currentPage: 1,
        }
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
    };

    handleClick = () => {
     this.props.toggle();
    };

    getImageURL = () => '/img/' + this.state.name + this.state.currentPage + '.jpg';

    handleNext() {
        if (this.state.currentPage < this.state.maxPage) {
            this.setState({currentPage: this.state.currentPage + 1})
        }
    }

    handlePrev() {
        if (this.state.currentPage > 1) {
            this.setState({currentPage: this.state.currentPage - 1})
        }
    } 

  render() {
      const imageURL = this.getImageURL();
    return (
     <div className="modal">
       <div className="modal_content">
        <div className="w3-padding w3-display-topright" onClick={this.handleClick}>&times;    </div>
        <img className="poemView" src={imageURL} alt="test" />
        <button className="w3-display-right" onClick={this.handleNext}>next</button>
        <button className="w3-display-left" onClick={this.handlePrev} >prev</button>
      </div>
     </div>
    );
   }
  }

class Masthead extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick = () => {
        this.props.toggle();
    }

    render () {
        return (
        <div className="modal">
            <div className="modal_content2 masthead">
                <div className="w3-padding w3-display-topright" onClick={this.handleClick}>&times;</div>
                <div className="masthead_title">MASTHEAD</div>
                <div className="staff">
                    <p> <b>Editor in Chief</b><br/>Lily Klineck</p>
                    <p> <b>Managing Editor</b><br/>Matthew Kim</p>
                    <p> <b>Faculty Adviser</b><br/>C.S. Giscombe</p>
                    <p> <b>Associate Editors</b><br/>Shreya Aviri<br/>Andrew Chan<br/>Nancy Duong<br/>Diego Fan<br/>
Julia Kolman<br/> Elena Koshkin<br/> Louis McKinnon<br/> Nathalia Moran<br/> Daniel Orona<br/> Tevel Pele</p>
                    <p> <b>Communications and Outreach</b><br/>Louis McKinnon</p>
                    <p> <b>Web Masters</b><br/>Louis McKinnon<br/>Ziyi Liu</p>
                    <p> <b>Midterm 4 Web Design</b><br/>Hiroaki Oshima</p>
                </div>
            </div>
        </div>
        );
    }
}

class EditorsNote extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick = () => {
        this.props.toggle();
    }

    render () {
        return (
        <div className="modal">
            <div className="modal_content2 editorsnote">
                <div className="w3-padding w3-display-topright" onClick={this.handleClick}>&times;</div>
                <div className="editorsnote_title">Editor's Note</div>
                <div className="editor_content">
                    <p>Coming soon.....</p>
                </div>
            </div>
        </div>
        );
    }
}

class Contributors extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick = () => {
        this.props.toggle();
    }

    render () {
        return (
        <div className="modal">
            <div className="modal_content2 contributors">
                <div className="w3-padding w3-display-topright" onClick={this.handleClick}>&times;</div>
                <div className="contributors_title">Editor's Note</div>
                <div className="contributor_content">
                    <p>Coming soon.....</p>
                </div>
            </div>
        </div>
        );
    }
}

export default class App extends React.Component {
    render () {
        return (
            <div>
                <Head>
                  <title>Berkeley Poetry Review Midterm 4 static/stasis</title>
                  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
                </Head>
                <Title />
                <MenuWrapper />
                <PoemBlocks />
            </div>
        );
    }
}


function animateDiv(id){
    var newq = makeNewPosition();
    var oldq = $(id).offset();

    
    try {
        var speed = calcSpeed([oldq.top, oldq.left], newq);
    
        $(id).animate({ top: newq[0] / 1.5, left: newq[1] / 1.5}, speed, function(){
        animateDiv(id);        
        });

    } catch(e) {
        console.log(e);
    }  
    
};


function calcSpeed(prev, next) {
    
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    
    var greatest = x > y ? x : y;
    
    var speedModifier = 0.07;

    var speed = Math.ceil(greatest/speedModifier);

    return speed;

}

function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
}



