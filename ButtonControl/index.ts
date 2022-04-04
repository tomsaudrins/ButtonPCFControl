import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class ButtonControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private _notifyOutputChanged:() => void;
	private _container: HTMLDivElement;
	private _context: ComponentFramework.Context<IInputs>;
	private _value: string = "";

    private buttonElement: HTMLButtonElement;
	private color: string;
	private backgroundColor: string;
	private borderRadius: string;
	private buttonText: string;
	private boundToField: string;

	constructor()
	{

	}

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
	{
		this._notifyOutputChanged = notifyOutputChanged;

		this._context = context;
		this._container = document.createElement("div");

		this.boundToField = context.parameters.BoundToField.raw??""
		this.buttonText = context.parameters.ButtonText.raw??""
		this.color = context.parameters.Color.raw??""
		this.backgroundColor = context.parameters.BackgroundColor.raw??""
		this.borderRadius = context.parameters.BorderRadius.raw??""
			
		this.buttonElement = document.createElement("button");
		this.buttonElement.innerHTML = this.buttonText
		this.buttonElement.style.borderRadius = this.borderRadius
		this.buttonElement.style.backgroundColor = this.backgroundColor
		this.buttonElement.style.color = this.color
		this.buttonElement.style.padding = "10px 15px"
		this.buttonElement.style.border = "1px solid gray"
		this.buttonElement.style.font = "Arial"

		this.buttonElement.addEventListener("click", this.submitClicked.bind(this))
		this._container.style.height = `${context.mode.allocatedHeight}px`;
		this._container.style.width = `${context.mode.allocatedWidth}px`;
		context.mode.trackContainerResize(true);

		this._container.appendChild(this.buttonElement);
		container.appendChild(this._container);
	}

	private submitClicked(event: Event): void {
		this._value = "true";
		this._notifyOutputChanged();
	}

	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
		this._context = context;
		this.buttonText = context.parameters.ButtonText.raw??""
		this.color = context.parameters.Color.raw??""
		this.backgroundColor = context.parameters.BackgroundColor.raw??""
		this.borderRadius = context.parameters.BorderRadius.raw??""
		this._container.style.height = `${context.mode.allocatedHeight}px`;
		this._container.style.width = `${context.mode.allocatedWidth}px`;
	}

	public getOutputs(): IOutputs
	{
		return {
			BoundToField:  this._value,
		};
	}

	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}
