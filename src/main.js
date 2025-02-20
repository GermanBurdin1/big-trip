import { render } from './framework/render.js';
import NewPointButtonView from './view/new-point-button-view.js';
import FilterModel from './model/filter-model.js';
import PointsModel from './model/points-model.js';
import RoutePresenter from './presenter/route-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic ssdfgodpfgoipE';
const END_POINT = 'https://20.objects.htmlacademy.pro/big-trip';
// https://20.objects.htmlacademy.pro/big-trip

const headerElement = document.querySelector('.page-header');
const mainElement = document.querySelector('.page-body__page-main');
const tripMainElement = document.querySelector('.trip-main');
const tripControlsElement = headerElement.querySelector('.trip-controls__filters');
const tripEventsElement = mainElement.querySelector('.trip-events');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const newPointButtonComponent = new NewPointButtonView();
const routePresenter = new RoutePresenter(tripEventsElement, pointsModel, filterModel, newPointButtonComponent);
const filterPresenter = new FilterPresenter(tripControlsElement, filterModel, pointsModel);
const tripInfoPresenter = new TripInfoPresenter(tripMainElement, pointsModel);


const handleNewPointFormClose = () => {
  newPointButtonComponent.setDisabled(false);
};

const handleNewPointButtonClick = () => {
  routePresenter.createPoint(handleNewPointFormClose);

  newPointButtonComponent.setDisabled(true);
};


filterPresenter.init();
routePresenter.init();
pointsModel.init()
  .finally(() => {
    render(newPointButtonComponent, tripMainElement);
    newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
  });
tripInfoPresenter.init();
