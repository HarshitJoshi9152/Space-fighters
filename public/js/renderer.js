/** 5/18/2020
 * the render class returns an object that keeps track of different layers to render
 * eg background, foreground, UI etc.
 * 
 * Layers are arrays stored in Renderer.layersToRender (array)
 * Each layer has a unique layerId (string)
 */

//5/20/2020 Now i think this is useless lol

class Renderer
{
	constructor(layerIds = [])
	{
		this.layersToRender = [];
		this.layerIds = layerIds;

		for (const id of layerIds) {
			this.layersToRender[id] = [];
		}
	}

	addRenderer = function(renderer, id) {
		if (this.layerIds.includes(id))
			this.layersToRender[id].push(renderer)
	}

	addLayer = function(layerId)
	{
		if (this.layerIds.includes(layerId))
			return;
		else
			this.layersToRender[layerId] = []
			this.layerIds.push(layerId);
	}

	render = function() {
		for (let id of layerIds)
		{
			for (let obj of this.layersToRender[id])
			{
				this.layersToRender[id][obj].render()
			}
		}
	}

}