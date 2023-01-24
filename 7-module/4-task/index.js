export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');
    this.steps = steps;
    this.segments = this.steps - 1;
    this.value = value;
    this.changeValue = this.changeValue.bind(this);
    this.initStepSlider();
    this.thumb = this.elem.querySelector('.slider__thumb');
    this.progress = this.elem.querySelector('.slider__progress');
    this.sliderStepsElement = this.elem.querySelector('.slider__steps');
    this.sliderValueElement = this.elem.querySelector('.slider__value');
    this.sliderSteps = this.sliderStepsElement.children
    this.sliderStepsElement.children[this.value].classList.add('slider__step-active');
    this.changeValue = this.changeValue.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.calculateLeftRelarive = this.calculateLeftRelarive.bind(this);
    this.addHandler();
  }

  // описываем шаги слайдера
  initStepSlider() {
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');
    this.elem.insertAdjacentHTML('beforeend', `
      <div class="slider__thumb" style="left: ${this.calculatePosition()}%">
        <span class="slider__value">${this.value}</span>
      </div>
      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: ${this.calculatePosition()}%"></div>
      <!--Шаги слайдера-->
      <div class="slider__steps">
        ${'<span></span>'.repeat(this.steps)}
      </div>`
    );
  }

  // рассчитываем позицию слайдера
  calculatePosition() {
    const segmentWidth = 100 / this.segments;

    return segmentWidth * this.value;
  };

  // определим расстояние от начала элемента слайдера до места, на котором находился курсор в момент клика
  calculateLeftRelarive(event) {
    const left = event.clientX - this.elem.getBoundingClientRect().left; // расстояние в пикселях от начала слайдера до места клика
    let leftRelative = left / this.elem.offsetWidth; // относительное значение от 0 до 1

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    return leftRelative;
  }
  // посчитать конкретное значение слайдера
  calculateCurrentValue(event) {
    const leftRelative = this.calculateLeftRelarive(event)
    const currentValue = Math.round(leftRelative * this.segments); // конкретное значение слайдера

    return currentValue;
  };

  // функция изменения значения слайдера
  changeValue(event) {
    const currentValue = this.calculateCurrentValue(event);
    this.value = currentValue;

    this.sliderValueElement.textContent = currentValue;

    for (let i = 0; i < this.sliderSteps.length; i++) {
      this.sliderSteps[i].classList.remove('slider__step-active');
    }

    this.sliderSteps[currentValue].classList.add('slider__step-active');

    this.thumb.setAttribute('style', `left: ${this.calculatePosition()}%`);
    this.progress.setAttribute('style', `width: ${this.calculatePosition()}%`);

    this.elem.dispatchEvent(new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    }))
  }

  changeDragValue(event) {
    let currentValue = this.calculateCurrentValue(event);

    if (currentValue < 0) {
      currentValue = 0;
    };

    if (currentValue > this.segments) {
      currentValue = this.segments;
    }

    this.value = currentValue;

    this.sliderValueElement.textContent = currentValue;

    for (let i = 0; i < this.sliderSteps.length; i++) {
      this.sliderSteps[i].classList.remove('slider__step-active');
    }

    this.sliderSteps[currentValue].classList.add('slider__step-active');
  }

  // для "зажатия" ползунка
  onPointerDown(event) {
    event.preventDefault();
    this.elem.classList.add('slider_dragging');

    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
  }

  // для движения ползунка
  onPointerMove(event) {
    let leftRelative = this.calculateLeftRelarive(event)

    const leftPercents = leftRelative * 100;

    this.thumb.setAttribute('style', `left: ${leftPercents}%`);
    this.progress.setAttribute('style', `width: ${leftPercents}%`);
    this.changeDragValue(event);
  }
  // для "отжатия" ползунка
  onPointerUp(event) {
    this.elem.classList.remove('slider_dragging');

    document.removeEventListener('pointerup', this.onPointerUp);
    document.removeEventListener('pointermove', this.onPointerMove);

    this.changeValue(event)
  }

  // меняем значение по клику
  addHandler() {
    this.elem.addEventListener('click', this.changeValue);
    this.thumb.addEventListener('pointerdown', this.onPointerDown)
    this.thumb.ondragstart = () => false;  // отключает встроенный браузерный Drag-and-Drop
  }
}
