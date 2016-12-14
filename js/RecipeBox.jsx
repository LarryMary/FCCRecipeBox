var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var Popover = ReactBootstrap.Popover;
var Tooltip = ReactBootstrap.Tooltip;
var OverlayTrigger = ReactBootstrap.OverlayTrigger;



function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return false;
    }
}

class Banner extends React.Component {
    render() {
        return (
            <div id = "banner">
                <div>
                    <img className="logo" src="images/RecipeBox.png"></img>
                </div>
            </div>
        );
    }
}

class Recipe extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            expanded: false,
            editing: false
        };
        this.toggleRender = this.toggleRender.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.editRecipe = this.editRecipe.bind(this);
    }

    render() {

        if (!this.state.expanded) {
           return this.renderTitle();
        } else {
            return this.renderAll();
        };
    }

    renderTitle() {

        return(
            <div className = "recipeCollapsed" >
                <div className = "recipeTitle" onClick = {this.toggleRender}>
                    <h1>{this.props.name}</h1>
                </div>
            </div>
        );
    }
    renderAll() {

        return(
            <div className = "recipeExpanded">
                <div className="recipeArea" onClick = {this.toggleRender}>
                    <div className = "recipeTitle">
                        <h1>{this.props.name}</h1>
                    </div>
                    <div className = "recipeIngredients">
                        <div className="recipeSubTitle">
                            <h2>Ingredients: </h2>
                        </div>
                        <div className = "recipeDetails">
                            {this.props.ingredients}
                        </div>
                    </div>
                    <div className="recipeComment">
                        <div className="recipeSubTitle">
                            <h2>Comments: </h2>
                        </div>
                        <div className = "recipeDetails">
                            {this.props.comments}
                        </div>
                    </div>
                </div>
                <div className="buttonArea">
                    <ModalDialog
                        onSave = {this.props.onSave}
                        buttonTitle = "Edit"
                        id = {this.props.id}
                        name = {this.props.name}
                        ingredients = {this.props.ingredients}
                        comments = {this.props.comments}
                        editMode = {true}
                    />
                    <Button
                        className = "buttonDelete"
                        bsStyle="primary"
                        bsSize="large"
                        onClick={this.deleteRecipe}>
                        Delete
                    </Button>
                </div>
            </div>
        );
    }
    deleteRecipe() {

        this.props.onDelete(this.props.id);
        this.toggleRender();
    }
    editRecipe() {

        this.props.onEdit(this.props.id);
        this.setState({
            editing: true
        });
    }

    toggleRender() {

        if (!this.state.expanded) {
            this.setState({expanded: true});
            this.renderAll();
        } else {
            this.setState({expanded: false});
            this.renderTitle();
        };
    }
}

class RecipeList extends React.Component {

    constructor(props) {

        super(props);
        var collapseAll =
        this.deletey = this.deletey.bind(this);
        this.editey = this.editey.bind(this);
    }

    render() {

        var blist = [];
        var expanded = false;
        var recipes = this.props.recipes;
        for (var i = 0; i < recipes.length; i++) {
            blist.push(
                <Recipe key = {i}
                        id = {recipes[i].id}
                        name = {recipes[i].name}
                        ingredients = {recipes[i].ingredients}
                        comments = {recipes[i].comments}
                        onSave = {this.props.onSave}
                        onEdit = {this.editey}
                        onAdd = {this.props.onAdd}
                        onDelete = {this.deletey}

                />
            );
        };
        return (
            <div id="listContainer">
                <h5>Recipe Box</h5>
                <div id = "recipeList">
                    {blist}
                </div>
            </div>
        );
    }
    deletey(id) {

        this.props.onDelete(id);
        this.forceUpdate();
    }
    editey(id) {
        this.props.onEdit(id);
    }
}

class RecipeBox extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            recipes: []
        }
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.saveRecipe = this.saveRecipe.bind(this);
        this.editRecipe = this.editRecipe.bind(this);
    }
    componentWillMount() {
            //default recipe list only to be loaded if
            // there is nothing in localStorage or it is unavailable
        var defaultRecipes = {
            recipes: [
                {
                    id: 0,
                    name: "Chocolate Pie",
                    ingredients: ["Chocolate, ", "Crust, ", "Whip Cream."],
                    comments: "Momma's Delicious Chocolate Pie."
                }, {
                    id: 1,
                    name: "Casserole",
                    ingredients: ["Dish, ", "Microwave, ", "Whatever."],
                    comments: "Put the Whatever in the Dish and press the Popcorn button. Experiment."
                }
            ]

        };
            //check for localStorage support
        if (storageAvailable('localStorage')) {
                //check for recipes saved in localStorage
            if(localStorage.getItem('_user_recipes_'))            {
                    //convert items back into an object with JSON.parse
                var _user_recipes_ = (JSON.parse(localStorage.getItem('_user_recipes_')));
                this.setState(_user_recipes_);
            } else {
                this.setState(defaultRecipes);
                var _user_recipes_ = defaultRecipes;
                    //must use JSON.stringify method to store data as a string
                localStorage.setItem('_user_recipes_', JSON.stringify(_user_recipes_));
            }
            console.log('storage is supported');
        } else {
                //notify if storage is not supported by browser
                //an set default recipes
            console.log('storage is not supported');
            alert("Local Storage is unavailable. Please record your recipes the old Fashioned Way");
            this.setState(defaultRecipes);
        }
    }

    render() {

        return (
            <div id = "RecipeBox">
                <Banner />
                <RecipeList recipes = {this.state.recipes}
                            onEdit = {this.editRecipe}
                            onSave = {this.saveRecipe}
                            onDelete = {this.deleteRecipe} />
                <ModalDialog    onSave = {this.saveRecipe}
                                editMode = {false} />
            </div>
        );
    }

    editRecipe(id){

        if(localStorage.getItem('_user_recipes_'))            {
            var editArray = JSON.parse(localStorage.getItem('_user_recipes_'));
            this.setState = ({
                recipes: editArray.recipes
            });

        } else {
            console.log('could not retrieve recipes from localStorage via RecipeBox');
        }
    }

    deleteRecipe(id){

        var arr = this.state.recipes;
        var elementPos = arr.map(function(x) {return x.id; }).indexOf(id);
        arr.splice(elementPos,1);
        this.setState({
            recipes: arr
        });
        var _user_recipes_ = {recipes: arr};
        localStorage.setItem('_user_recipes_', JSON.stringify(_user_recipes_));
        this.saveRecipe;
    }

    saveRecipe() {

        if(localStorage.getItem('_user_recipes_'))            {
            var _user_recipes_ = JSON.parse(localStorage.getItem('_user_recipes_'));
            this.setState(_user_recipes_);
            localStorage.setItem('_user_recipes_', JSON.stringify(_user_recipes_));

        } else {
            console.log('could not retrieve recipes from localStorage via RecipeBox');
        }
    }
}

const ModalDialog = React.createClass({

    getInitialState() {

        var editMode = this.props.editMode;
        var idInit = '';
        var nameInit = '';
        var ingredientsInit = [];
        var commentsInit = '';
        var countInit = 2;

        //if in editMode use props from recipe to edit
        if(editMode) {

            countInit = this.props.id;
            idInit = this.props.id;
            nameInit = this.props.name;
            ingredientsInit = this.props.ingredients;
            commentsInit = this.props.comments;
        }

        return {
            showModal: false,
            newRecipe: [],
            retrievedRecipes: {},
            count: countInit,
            id: idInit,
            name: nameInit,
            ingredients: ingredientsInit,
            comments: commentsInit,
            editMode: editMode,
            value: '',
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleIngredientsChange = this.handleIngredientsChange.bind(this);
        this.handleCommentsChange = this.handleCommentsChange.bind(this);
    },

    close() {
        this.setState({ showModal: false });
    },

    open() {
        this.setState({ showModal: true });
        if (!this.props.editMode) {
            this.setState({
                newRecipe: [],
                retrievedRecipes: {},
                id: '',
                name: '',
                ingredients: '',
                comments: '',
                value: '',
            });
        };
    },

    save() {

        if (storageAvailable('localStorage')) {
            if(localStorage.getItem('_user_recipes_'))            {
                var storageRetrieval = JSON.parse(localStorage.getItem('_user_recipes_'))
                var retrievedRecipes = storageRetrieval.recipes;

            } else {
                console.log('could not retrieve recipes from localStorage');
            }

            var recipeToSave = [{
                id: this.state.count,
                name: this.state.name,
                ingredients: this.state.ingredients,
                comments: this.state.comments
            }];

            if(this.state.editMode) {
                var elementPos = retrievedRecipes.map(function(x) {return x.id}).indexOf(this.state.count);
                retrievedRecipes[elementPos] = recipeToSave[0];
                console.log(retrievedRecipes);
                var _user_recipes_ = {recipes: retrievedRecipes};

                //var _user_recipes_ = {recipes: retrievedRecipes};
            } else {
                var newRecipeArray = retrievedRecipes.concat(recipeToSave);
                if(retrievedRecipes) {
                    var _user_recipes_ =  {recipes: newRecipeArray};
                } else {
                    var _user_recipes_ = {recipes: recipeToSave};
                }
            }

            localStorage.setItem('_user_recipes_', JSON.stringify(_user_recipes_));
        } else {
            console.log('storage is not supported');
            alert("Local Storage is unavailable. Please record your recipes the old Fashioned Way");
        };

        var newCount = this.state.count;
        if(!this.state.editMode) {
            newCount++;
        }
        this.setState({count: newCount});
        this.props.onSave();
        this.close();
    },

    handleNameChange(value) {
        this.setState({name: value});
    },
    handleIngredientsChange(value) {
        this.setState({ingredients: value});
    },
    handleCommentsChange(value) {
        this.setState({comments: value});
    },

    render() {

        const nameTip = (
            <Tooltip id="modal-tooltip">
                Enter the name of a new recipe.
            </Tooltip>
        );
        const ingredientTip = (
            <Tooltip id="modal-tooltip">
                Enter the name of a new ingredients.
            </Tooltip>
        );
        const commentTip = (
            <Tooltip id="modal-tooltip">
                Enter comments or instructions.
            </Tooltip>
        );

        const value = this.state.value;
        const name = this.state.name;
        const ingredients = this.state.ingredients;
        const comments = this.state.comments;
        const buttonName = this.state.editMode ? 'Edit' : 'Add A Recipe';

        return (
            <div className="buttonAreaTail">
                <Button
                    className = "buttonAdd"
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.open}
                >
                    {buttonName}
                </Button>
                <Modal id = "addRecipeModal" show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>{buttonName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <OverlayTrigger overlay={nameTip}>
                            <a href="#">
                                <h4>Name: </h4>
                                <AddRecipeForm
                                    value = {name}
                                    ref = "NRN"
                                    onChange = {this.handleNameChange}>
                                </AddRecipeForm>
                            </a>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={ingredientTip}>
                            <a href="#">
                                <h4>Ingredients: </h4>
                                <AddRecipeForm
                                    value = {ingredients}
                                    ref = "NRI"
                                    onChange = {this.handleIngredientsChange}>
                                </AddRecipeForm>
                            </a>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={commentTip}>
                            <a href="#">
                                <h4>Comment: </h4>
                                <AddRecipeForm
                                    value = {comments}
                                    ref = "NRC"
                                    onChange = {this.handleCommentsChange}>
                                </AddRecipeForm>
                            </a>
                        </OverlayTrigger>
                        <Button className = "buttonSave" bsStyle = "primary" onClick={this.save}>Save</Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle = "primary" onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});

class AddRecipeForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.props.onChange(event.target.value);
    }

    handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        const value = this.props.value;
        return (
            <form>
                <label>
                    <textarea value = {value}
                              onChange = {this.handleChange}/>
                </label>
            </form>
        );
    }
}

ReactDOM.render(
    <RecipeBox />,
    document.getElementById('container')
);
