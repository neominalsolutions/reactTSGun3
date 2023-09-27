import { Component, ReactNode } from "react";

type classComponentProps = {
  title: string
}
type classComponentState = {
  counter: number,
  isActive: boolean
}
// 1. kural bir şey class component olabilmesi için Component class dan extend edilebilmelidir.
class ClassComponentSample extends Component<classComponentProps, classComponentState> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  interval: any; // field

  constructor(props: classComponentProps) {
    super(props);
    // methodları class bind ettmek için event binding yapmak için
    // class olduğunda class üyelerine this keyword ile erişilir
    // initial state değeri
    this.state = {
      counter: 0,
      isActive: false
    }

    this.increaseCount = this.increaseCount.bind(this); // consturctorda class bir evente bağlandığını söylüyoruz
    // this.onClick+=
    this.decreaseCount = this.decreaseCount.bind(this);
  }
  // class içinde olduğumuzdan function tanımları method şeklinde yazılır, arrow function kullanılmaz
  increaseCount(): void {
    // state bir önceki isActive değerini koruyabilmek için spread operatörü ile state bir sonraki state çekip, üzerine güncellenecek olan kısmı ekliyorum

    if (this.state.counter >= 0 && this.state.counter < 10) {
      const newState = { ...this.state, counter: this.state.counter + 1 };
      this.setState({ ...newState }); // class componentlerde state değişimi setState methodu ile oluyor.
    }
  }
  decreaseCount(): void {
    if (this.state.counter > 0) {
      const newState = { ...this.state, counter: this.state.counter - 1 };
      this.setState({ ...newState }); // setState olan herşey render tetikler.
    }
  }
  // class componentler içinde 3 adet önemli lifecycle method var
  componentDidMount(): void {
    console.log('component ilk doma girdiğinde')

    let count = 0;

    this.interval = setInterval(() => {
      count = count + 1;
      console.log('timing', count)
    }, 1000)

    setTimeout(() => {

      this.setState({ ...this.state, counter: 1 })

    }, 2000)

    // apiden veri çek
    // timing başlat
    // render tetiklenir
    // sayfa açılışında component doma girince sadece 1 defa çalışır.
  }
  componentDidUpdate(prevProps: Readonly<classComponentProps>, prevState: Readonly<classComponentState>, snapshot?: any): void {
    console.log('state değişimi olduğunda', prevProps, prevState, snapshot)
    // render tetiklenir
    // state değişimlerine göre işlem yapmak için burası

    if (prevState.counter < this.state.counter) {
      console.log('büyük sayı seçiniz');
    } else {
      console.log('küçük sayı seçiniz');
    }

    // state değişmeden önce araya girme.
    if (prevState.counter == 9) {
      const result = window.confirm("Sayacı sıfırlamak istermisiniz");

      if (result) {
        this.setState({ ...this.state, counter: 1 })
      }
    }
  }
  // if veya bir sayfa geçiş işlemi olabilir bu method tetiklenir
  componentWillUnmount(): void {
    console.log('component domdan remove olduğunda')
    // render tetiklemez component domdan kalkar.
    // interval clear etme burası
    clearInterval(this.interval);
  }
  // her state değişiminde çalışır
  // ilk açılışta componentDidMount çalışır.
  render(): ReactNode {
    console.log('render');
    return <>
      {this.state.counter > 0 ? <> <label>Sayac: {this.state.counter}</label>
        {' '}
        <button onClick={this.increaseCount}> Artır </button>
        <button onClick={this.decreaseCount}> Azalt </button>
        <p>
          Title Prop: {this.props.title}
        </p>
      </>
        :
        <>Yükleniyor ... </>}

    </>
  }
}

export default ClassComponentSample;