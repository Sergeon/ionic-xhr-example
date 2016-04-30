angular.module('satio.controllers', [])


.controller('homeCtrl' , function($scope , $window , $location){

/*=========================================================
        ---$SCOPE FUNCTIONS---
=========================================================*/


    /**
     * reads raw data form latest blocks request to toshi.io and
     * push some data into $scope.blocksData
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    $scope.formatData = function( data ){

        for(var $i = 0; $i <10; $i++){
            $scope.blocksData.push(data[$i]);
        }

    }

    $scope.askBlocks = function(){

        var xhr = new XMLHttpRequest();

        xhr.open('GET',
			encodeURI('https://bitcoin.toshi.io/api/v0/blocks'));


		xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

		xhr.responseType = 'json';

		xhr.onload = function() {

			if (xhr.status === 200) {

				$scope.$apply(function(){
                    $scope.formatData(xhr.response);
                    $scope.loading = false;
                });

			}
			else if (xhr.status !== 200) {
				console.log(xhr);
                //TODO show error message
			}

		};

		xhr.send();

    }


    $scope.reloadBlocks = function(){

        $scope.loading = true;
        $scope.askBlocks();
    }


    $scope.goToDetail = function( blockHeight){


        $window.location.href = '#/app/detail';
        $window.localStorage.setItem('currentBlock' , blockHeight );
        //put the height in storage

        //change view to detail

    }

/*=========================================================
        ---$SCOPE VARS---
=========================================================*/


    $scope.loading = true;
    $scope.blocksData = [];


/*=========================================================
        ---INIT---
=========================================================*/

    $scope.askBlocks();



})

.controller('detailCtrl' , function($scope , $window ){



    /*=========================================================
            ---$SCOPE FUNCTIONS---
    =========================================================*/


    $scope.askCurrentBlockData = function(){

        var xhr = new XMLHttpRequest();

        xhr.open('GET',
			encodeURI('https://bitcoin.toshi.io/api/v0/blocks/' + $scope.block ));


		xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

		xhr.responseType = 'json';

		xhr.onload = function() {

			if (xhr.status === 200) {

				$scope.$apply(function(){
                    $scope.formatBlockData(xhr.response);
                    $scope.loading = false;
                });

			}
			else if (xhr.status !== 200) {
				console.log(xhr);
                //TODO show error message
			}

		};

		xhr.send();

    }




    $scope.formatBlockData = function( data ){


        $scope.blockData.hash = data.hash;
        $scope.blockData.height = data.height;
        $scope.blockData.reward = data.reward;
        $scope.blockData.difficulty = data.difficulty;
        $scope.blockData.time = data.time;

        console.log($scope.blockData);


    }

    /*=========================================================
            ---$SCOPE VARS---
    =========================================================*/

    $scope.block = $window.localStorage.currentBlock;

    $scope.loading = true;

    $scope.blockData = {};





    /*=========================================================
            ---$SCOPE INIT---
    =========================================================*/


    $scope.askCurrentBlockData();


})
