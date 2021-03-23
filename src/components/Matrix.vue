/* File: Matrix.vue 
   Desc: Component for the entering matrix
*/

<template>

    <div class="user-input">
        <div class="grid">
            <div class="notification is-warning" v-if="badEntries.length !== 0">
                Error: there are invalid entries @ the following locations:
                <div class="level-item">
                    ({{badEntries[0][0]}}, {{badEntries[0][1]}})
                    <div v-for="pair in badEntries.slice(1)" :key="badEntries.indexOf(pair)">
                       , ({{pair[0]}}, {{pair[1]}})
                    </div>
                </div>
            </div>
            <h3>{{rows}} by {{columns}} Matrix:</h3>            
            <!--Matrix Display-->
            <div v-for="(row, row_index) in MatrixArray" :key="row_index" class="matrix-row">
                <div v-for="(entry, col_index) in row" :key="col_index" class="matrix-entry">
                    <input class="input is-normal box has-text-centered" v-model="MatrixArray[row_index][col_index]" type="text">
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
const Fraction = require('fraction.js');

import {rref} from "../logic/RowReduce.js";

export default {
    data(){
        return {
            MatrixArray: [],
            badEntries: []
        }
    },
    methods:{
        reduce: function(){
            // don't reduce if we have invalid entries
            this.checkAllFractions();
            if (this.badEntries.length !== 0) return;

            // otherwise we should be ok to reduce
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
        },
        checkAllFractions: function(){
            // assume there are no bad entries at first
            this.badEntries = [];

            // now let's check if there are any bad existing entries
            for (let y=0; y < this.MatrixArray.length; y++){
                for (let x=0; x < this.MatrixArray[0].length; x++){
                    this.checkFraction(x, y);
                }
            }
        },
        checkFraction: function(x, y){
            try {
                this.MatrixArray[y][x] = new Fraction(this.MatrixArray[y][x]);
            } catch (Exception) {
                console.log("Exception caught: ", Exception.message);
                this.badEntries.push([x, y]);
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