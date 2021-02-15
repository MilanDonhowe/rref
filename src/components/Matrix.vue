/* File: Matrix.vue 
   Desc: Component for the entering matrix
*/

<template>

    <div class="user-input">
        
        <div class="grid">
            <h3>{{rows}} by {{columns}} Matrix:</h3>            
            <div v-for="(row, row_index) in MatrixArray" :key="row_index" class="matrix-row">
                <div v-for="(entry, col_index) in row" :key="col_index" class="matrix-entry">
                    <input class="input is-normal box has-text-centered" v-model.number="MatrixArray[row_index][col_index]" type="number">
                </div>
            </div>
        </div>
        <br>
        <div class='level field'>
            <div class="control level-item">
                <button v-on:click="reduce" class="button is-dark ">Row Reduce</button>
            </div>
            <div class="control level-item">
                <button v-on:click="clear" class="button is-dark is-half">Clear Matrix</button>
             </div>
        </div>

    </div>

</template>

<script>
import {rref} from "./RowReduce.js";

export default {
    data(){
        return {
            MatrixArray: [],
        }
    },
    methods:{
        reduce: function(){
            let new_matrix = rref(this.MatrixArray);
            for (let i=0; i < new_matrix.length; i++){
                this.$set(this.MatrixArray, i, new_matrix[i]);
            }
        },
        clear: function(){
            for (let i=0; i < this.MatrixArray.length; i++){
                for (let j=0; j < this.MatrixArray[0].length; j++){
                    this.$set(this.MatrixArray[i], j, 0);
                }
            }
        }
    },
    props:{
        rows: Number,
        columns: Number
    },
    created: function(){
        this.MatrixArray = []
        let empty_column = []
        for (let col=0; col < this.columns; col++){
            empty_column.push(0);
        }
        for (let row=0; row < this.rows; row++){
            this.MatrixArray.push([...empty_column]);
        }
    },
    // change size of our matrix dynamically
    updated: function(){
        
        // do we have valid dimensions?
        if (this.rows <= 0 || this.columns <= 0) return;

        // Adjust column length if needed
        if (this.columns !== this.MatrixArray[0].length){
            for (let row=0; row < this.rows; row++){
                while (this.MatrixArray[row].length > this.columns){
                    this.MatrixArray[row].pop();
                }
                while (this.MatrixArray[row].length < this.columns){
                    this.MatrixArray[row].push(0);
                }
            }
        }

        // Adjust row length if needed
        while (this.MatrixArray.length < this.rows){
            console.log("Adding rows!");
            let new_row = [];
            for (let i=0; i<this.columns;i++) new_row.push(0);
            this.MatrixArray.push(new_row);
        }
        // if we have too many rows, remove some
        while (this.MatrixArray.length > this.rows){
            this.MatrixArray.pop();
        }

        

    },
    name:"matrix"
}
</script>

<style scoped>
    .grid{
        margin: 0 auto;
    }
    .matrix-row{
        display: flex;
        justify-content: center;
    }
    .matrix-entry{
        text-align: center;
        justify-content: center;
    }
</style>