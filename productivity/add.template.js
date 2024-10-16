export  function add() {
    return `
    <div>
    <form id="add-activity">
        <h4>Add Activity</h4>
       
        <!-- <input name="date" type="date"/> -->
        {{#activities}}
        <div>
        {{#checked}}
                <label><input type="checkbox" checked="true" name="activities" value="{{handle}}"> {{item}}</label>
        {{/checked}}
        {{^checked}}
                <label><input type="checkbox" name="activities" value="{{handle}}"> {{item}}</label>
        {{/checked}}
           
        </div>
        <br/>
        {{/activities}}
        <input type="submit" value="add">
    </form>
</div> 
    `;
};